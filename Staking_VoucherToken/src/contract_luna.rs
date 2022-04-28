#[cfg(not(feature = "library"))]

use cosmwasm_std::{
    Addr, DepsMut, Env, MessageInfo, Response, WasmMsg, CosmosMsg, to_binary,
    Uint128, BankMsg, StdResult
};

use cw20::{Cw20ExecuteMsg};

use crate::error::ContractError;
use crate::msg::{ UserInfo, AprInfo};
use crate::state::{TREASURY, LUNA_APR_HISTORY, LUNA_USER_INFOS, VLUNA, LUNA_TOTAL_REWARDS};
use crate::util::{check_onlyowner, check_onlytreasury, append_amount_history, get_luna_apr,
    farm_withdraw, deposit_potinfo, withdraw_potinfo, pot_process
};


pub fn try_set_apr_luna(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    apr: Uint128
)
    ->Result<Response, ContractError>
{
    check_onlyowner(deps.storage, info.sender)?;
    let mut apr_history = LUNA_APR_HISTORY.load(deps.storage)?;
    let apr_info = AprInfo{
        apr,
        time: env.block.time.seconds(),
    };

    apr_history.push(apr_info);
    LUNA_APR_HISTORY.save(deps.storage, &apr_history)?;
    Ok(Response::new())
}
pub fn try_deposit_luna(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    qualified: bool
)
    -> Result<Response, ContractError>
{
    let wallet = info.sender;
    let _fund = info.funds.clone();
    let fund = &info.funds[0];

    if fund.denom != "uluna" {
        return Err(ContractError::PoolError{
            msg: "Invalid Fund Request".to_string()
        });
    }

    let res = LUNA_USER_INFOS.may_load(deps.storage, wallet.clone())?;
    let user_info = match res{
        Some(mut info) => {
            info.amount += fund.amount;
            info
        },
        None => UserInfo{
            wallet: wallet.clone(),
            amount: fund.amount,
            reward_amount: Uint128::zero(),
            deposit_time: Uint128::from(env.block.time.seconds() as u128),
        }
    };

    LUNA_USER_INFOS.save(deps.storage, wallet.clone(), &user_info)?;

    append_amount_history(deps.storage, env, Uint128::zero(), fund.amount, true)?;
    deposit_potinfo(deps.storage, wallet.clone(), Uint128::zero(), fund.amount, qualified)?;

    let send2_treasury = BankMsg::Send { 
        to_address: TREASURY.load(deps.storage)?.to_string(),
        amount: _fund
    };

    let mint2_user = WasmMsg::Execute { 
        contract_addr: VLUNA.load(deps.storage)?.to_string(), 
        msg: to_binary(
            &Cw20ExecuteMsg::Mint{
                recipient: wallet.to_string(), 
                amount: fund.amount
            }
        )?, 
        funds: vec![]
    };

    Ok(Response::new()
        .add_attribute("action", "desposit")
        .add_messages([
            CosmosMsg::Bank(send2_treasury), 
            CosmosMsg::Wasm(mint2_user)
        ])
        .add_attribute("amount", fund.amount.to_string())
    )
}

pub fn try_withdraw_luna(
    deps: DepsMut,
    env: Env,
    wallet: Addr,
    amount: Uint128,
    ust_price: Uint128,
    luna_price: Uint128
)
    -> Result<Response, ContractError>
{
    let mut user_info = LUNA_USER_INFOS.load(deps.storage, wallet.clone())?;
    if user_info.amount + user_info.reward_amount < amount {
        return Err(ContractError::NotEnoughBalance { balance: amount });
    }
    user_info.deposit_time = Uint128::from(env.block.time.seconds() as u128);
    let remain;
    if user_info.amount >= amount {
        remain = amount;
        user_info.amount -= amount;
    } else {
        remain = user_info.amount;
        user_info.amount = Uint128::zero();
        user_info.reward_amount -= amount - remain;

        let mut total_rewards = LUNA_TOTAL_REWARDS.load(deps.storage)?;
        total_rewards -= amount - remain;
        LUNA_TOTAL_REWARDS.save(deps.storage, &total_rewards)?;
    }
    
    append_amount_history(deps.storage, env.clone(), Uint128::zero(), remain, false)?;
    withdraw_potinfo(deps.storage, wallet.clone(), Uint128::zero(), remain)?;
    farm_withdraw(deps.storage, env, wallet.clone(), Uint128::zero(), remain, ust_price, luna_price)?;

    LUNA_USER_INFOS.save(deps.storage, wallet.clone(), &user_info)?;

    let burn_this = WasmMsg::Execute { 
        contract_addr: VLUNA.load(deps.storage)?.to_string(), 
        msg: to_binary(
            &Cw20ExecuteMsg::Burn{
                amount: amount
            }
        )?, 
        funds: vec![]
    };
    Ok(Response::new()
        .add_message(burn_this)
        .add_attribute("action", "withdraw")
    )
}

pub fn try_rewards_luna(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
)
    -> Result<Response, ContractError>
{
    check_onlytreasury(deps.storage, info.sender)?;
    
    let all: StdResult<Vec<_>> = LUNA_USER_INFOS.range(deps.storage, None, None, 
        cosmwasm_std::Order::Ascending).collect();
    let all = all.unwrap();

    let mut msgs = Vec::new();
    let mut total_rewards = LUNA_TOTAL_REWARDS.load(deps.storage)?;

    for x in all{
        let mut user_info = x.1;
        let apr = get_luna_apr(deps.storage)?;
        let rewards = (user_info.amount + user_info.reward_amount) * apr / Uint128::from(10_000u128) / Uint128::from(365u128);
        user_info.reward_amount += rewards;
        total_rewards += rewards;

        LUNA_USER_INFOS.save(deps.storage, user_info.wallet.clone(), &user_info)?;

        if rewards > Uint128::zero() {
            let mint2_user = WasmMsg::Execute { 
                contract_addr: VLUNA.load(deps.storage)?.to_string(), 
                msg: to_binary(
                    &Cw20ExecuteMsg::Mint{
                        recipient: user_info.wallet.to_string(), 
                        amount: rewards
                    }
                )?, 
                funds: vec![]
            };
            msgs.push(mint2_user);
        }
    }
    LUNA_TOTAL_REWARDS.save(deps.storage, &total_rewards)?;
    append_amount_history(deps.storage, env, Uint128::zero(), Uint128::zero(), true)?;
    
    Ok(Response::new()
        .add_messages(msgs)
        .add_attribute("action", "rewards")
    )
}
