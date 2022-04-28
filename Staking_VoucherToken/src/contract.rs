#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;

use cosmwasm_std::{
    Addr, DepsMut, Env, MessageInfo, Response, WasmMsg, CosmosMsg, to_binary,
    Uint128, BankMsg, StdResult, from_binary, Storage
};
use cw2::set_contract_version;
use cw20::{Cw20ExecuteMsg, Cw20ReceiveMsg};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, UserInfo, AprInfo, Cw20HookMsg, FarmInfo};
use crate::state::{OWNER, TREASURY, UST_APR_HISTORY, UST_USER_INFOS, 
    LUNA_APR_HISTORY, AMOUNT_HISTORY, VUST, VLUNA, FARM_STARTTIME, FARM_INFOS, LUNA_USER_INFOS,
    TOTAL_FARMED, FARM_PRICE, UST_TOTAL_REWARDS, LUNA_TOTAL_REWARDS
};
use crate::util::{check_onlyowner, check_onlytreasury, append_amount_history, get_ust_apr,
    farm_withdraw, deposit_potinfo, withdraw_potinfo, pot_process};
use crate::contract_luna::{try_deposit_luna, try_withdraw_luna, try_set_apr_luna, try_rewards_luna };

// version info for migration info
const CONTRACT_NAME: &str = "Pool";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
pub const FARM_AMOUNT: u128 = 114_000_000;
pub const FARM_PERIOD: u64 = 5_184_000; //60 days in second

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let owner = msg
        .owner
        .and_then(|s| deps.api.addr_validate(s.as_str()).ok()) 
        .unwrap_or(info.sender.clone());
    OWNER.save(deps.storage, &owner)?;

    let treasury = deps.api.addr_validate(msg.treasury.as_str())?;
    TREASURY.save(deps.storage, &treasury)?;

    let mut ust_apr_history: Vec<AprInfo> = Vec::new();
    ust_apr_history.push(
        AprInfo{
            apr: msg.ust_apr,
            time: env.block.time.seconds()
        }
    );
    UST_APR_HISTORY.save(deps.storage, &ust_apr_history)?;

    let mut luna_apr_history: Vec<AprInfo> = Vec::new(); 
    luna_apr_history.push(
        AprInfo{
            apr: msg.luna_apr,
            time: env.block.time.seconds()
        }
    );
    LUNA_APR_HISTORY.save(deps.storage, &luna_apr_history)?;

    VUST.save(deps.storage, &msg.vust)?;
    VLUNA.save(deps.storage, &msg.vluna)?;

    AMOUNT_HISTORY.save(deps.storage, &Vec::new())?;

    UST_TOTAL_REWARDS.save(deps.storage, &Uint128::zero())?;
    LUNA_TOTAL_REWARDS.save(deps.storage, &Uint128::zero())?;
//----------farm---------------------
    // FARM_STARTTIME.save(deps.storage, &Uint128::zero())?;
    FARM_PRICE.save(deps.storage, &Uint128::from(25u128))?;
    FARM_STARTTIME.save(deps.storage, &Uint128::from(env.block.time.seconds() as u128))?;
    
    TOTAL_FARMED.save(deps.storage, &Uint128::zero())?;
    Ok(Response::new()
        .add_attribute("action", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Receive(msg) => receive_cw20(deps, env, info, msg),

        ExecuteMsg::SetConfig{ owner, treasury, vust, vluna }
            => try_setconfig(deps, info, owner, treasury, vust, vluna),

        ExecuteMsg::SetAprUst{ apr }
            => try_set_apr_ust(deps, env, info, apr),

        ExecuteMsg::DepositUst { qualified }
            => try_deposit_ust(deps, env, info, qualified),
        
        ExecuteMsg::RewardsUst {  }
            => try_rewards_ust(deps, env, info),
//---------------------------------------------------------------
        ExecuteMsg::SetAprLuna{ apr }
            => try_set_apr_luna(deps, env, info, apr),

        ExecuteMsg::DepositLuna { qualified }
            => try_deposit_luna(deps, env, info, qualified),

        ExecuteMsg::RewardsLuna{ }
            => try_rewards_luna(deps, env, info),
//--------------FARM--------------------------
        ExecuteMsg::SetFarmStartTime{ time }
            => try_set_farmstarttime(deps, env, info, time),

        ExecuteMsg::Farm{ ust_price, luna_price }
            => try_farm(deps, env, info, ust_price, luna_price),
//--------------Pot---------------------------------
        ExecuteMsg::PotProcess{ }
            => pot_process(deps.storage, info),
    }
}
pub fn receive_cw20(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    cw20_msg: Cw20ReceiveMsg,
) -> Result<Response, ContractError> {
    let contract_addr = info.sender;
    match from_binary(&cw20_msg.msg) {
        Ok(Cw20HookMsg::WithdrawUst {wallet, ust_price, luna_price}) => {
            // only asset contract can execute this message
            let vust = VUST.load(deps.storage)?;
            if deps.api.addr_validate(contract_addr.as_str())? != vust {
                return Err(ContractError::Unauthorized {});
            }

            try_withdraw_ust(deps, env, wallet, cw20_msg.amount, ust_price, luna_price)
        },
        Ok(Cw20HookMsg::WithdrawLuna {wallet, ust_price, luna_price}) => {
            // only asset contract can execute this message
            let vluna = VLUNA.load(deps.storage)?;
            if deps.api.addr_validate(contract_addr.as_str())? != vluna {
                return Err(ContractError::Unauthorized {});
            }

            try_withdraw_luna(deps, env, wallet, cw20_msg.amount, ust_price, luna_price)
        }
        _ => Err(ContractError::MissingHook {}),
    }
}

pub fn try_setconfig(
    deps:DepsMut, 
    info:MessageInfo, 
    owner: Option<Addr>,
    treasury: Option<Addr>,
    vust: Option<Addr>,
    vluna: Option<Addr>,
)
    -> Result<Response, ContractError>
{
    check_onlyowner(deps.storage, info.sender.clone())?;

    match owner{
        Some(admin) => {
            OWNER.save(deps.storage, &admin)?
        },
        None => {}
    };

    match treasury{
        Some(wallet) => {
            TREASURY.save(deps.storage, &wallet)?
        },
        None => {}
    };

    match vust{
        Some(wallet) => {
            VUST.save(deps.storage, &wallet)?
        },
        None => {}
    };

    match vluna{
        Some(wallet) => {
            VLUNA.save(deps.storage, &wallet)?
        },
        None => {}
    };

    Ok(Response::new()
        .add_attribute("action", "SetConfig"))                                
}
pub fn try_set_apr_ust(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    apr: Uint128
)
    ->Result<Response, ContractError>
{
    check_onlyowner(deps.storage, info.sender)?;
    let mut apr_history = UST_APR_HISTORY.load(deps.storage)?;
    let apr_info = AprInfo{
        apr,
        time: env.block.time.seconds(),
    };

    apr_history.push(apr_info);
    UST_APR_HISTORY.save(deps.storage, &apr_history)?;
    Ok(Response::new())
}
pub fn try_deposit_ust(
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

    if fund.denom != "uusd" {
        return Err(ContractError::PoolError{
            msg: "Invalid Fund Request".to_string()
        });
    }

    let res = UST_USER_INFOS.may_load(deps.storage, wallet.clone())?;
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

    UST_USER_INFOS.save(deps.storage, wallet.clone(), &user_info)?;

    append_amount_history(deps.storage, env, fund.amount, Uint128::zero(), true)?;
    deposit_potinfo(deps.storage, wallet.clone(), fund.amount, Uint128::zero(), qualified)?;

    let send2_treasury = BankMsg::Send { 
        to_address: TREASURY.load(deps.storage)?.to_string(),
        amount: _fund
    };

    let mint2_user = WasmMsg::Execute { 
        contract_addr: VUST.load(deps.storage)?.to_string(), 
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

pub fn try_withdraw_ust(
    deps: DepsMut,
    env: Env,
    wallet: Addr,
    amount: Uint128,
    ust_price: Uint128,
    luna_price: Uint128
)
    -> Result<Response, ContractError>
{
    let mut user_info = UST_USER_INFOS.load(deps.storage, wallet.clone())?;
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

        let mut total_rewards = UST_TOTAL_REWARDS.load(deps.storage)?;
        total_rewards -= amount - remain;
        UST_TOTAL_REWARDS.save(deps.storage, &total_rewards)?;
    }

    append_amount_history(deps.storage, env.clone(), remain, Uint128::zero(), false)?;
    withdraw_potinfo(deps.storage, wallet.clone(), remain, Uint128::zero())?;
    farm_withdraw(deps.storage, env, wallet.clone(), remain, Uint128::zero(), ust_price, luna_price)?;

    UST_USER_INFOS.save(deps.storage, wallet, &user_info)?;

    let burn_this = WasmMsg::Execute { 
        contract_addr: VUST.load(deps.storage)?.to_string(), 
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

pub fn try_rewards_ust(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
)
    -> Result<Response, ContractError>
{
    check_onlytreasury(deps.storage, info.sender)?;

    let all: StdResult<Vec<_>> = UST_USER_INFOS.range(deps.storage, None, None, 
        cosmwasm_std::Order::Ascending).collect();
    let all = all.unwrap();

    let mut msgs = Vec::new();
    let mut total_rewards = UST_TOTAL_REWARDS.load(deps.storage)?;

    for x in all{
        let mut user_info = x.1;
        let apr = get_ust_apr(deps.storage)?;
        let rewards = (user_info.amount + user_info.reward_amount) * apr / Uint128::from(10_000u128) / Uint128::from(365u128);
        user_info.reward_amount += rewards;
        total_rewards += rewards;

        UST_USER_INFOS.save(deps.storage, user_info.wallet.clone(), &user_info)?;
        if rewards > Uint128::zero() {
            let mint2_user = WasmMsg::Execute { 
                contract_addr: VUST.load(deps.storage)?.to_string(), 
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
    UST_TOTAL_REWARDS.save(deps.storage, &total_rewards)?;
    append_amount_history(deps.storage, env, Uint128::zero(), Uint128::zero(), true)?;
    
    Ok(Response::new()
        .add_messages(msgs)
        .add_attribute("action", "rewards")
    )
}
pub fn update_farm_info(
    storage: &mut dyn Storage,
    wallet: Addr,
    amount: Uint128
)
    ->StdResult<bool>
{
    let res = FARM_INFOS.may_load(storage, wallet.clone())?;
    let user_info = match res{
        Some(mut info) => {
            info.amount += amount;
            info
        },
        None => FarmInfo{
            wallet: wallet.clone(),
            amount: amount,
        }
    };
    FARM_INFOS.save(storage, wallet, &user_info)?;
    Ok(true)
}
pub fn try_set_farmstarttime(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    time: Uint128,
)
    -> Result<Response, ContractError>
{
    FARM_STARTTIME.save(deps.storage, &time)?;
    Ok(Response::new())
}
pub fn try_farm(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    ust_price: Uint128,
    luna_price: Uint128
)
    -> Result<Response, ContractError>
{
    check_onlytreasury(deps.storage, info.sender)?;

    let current_time = Uint128::from(env.block.time.seconds() as u128);
    let farm_starttime = FARM_STARTTIME.load(deps.storage)?;
    let farm_endtime = farm_starttime + Uint128::from(FARM_PERIOD);

//-----------------condition check------------------------------
    if farm_starttime == Uint128::zero() || current_time < farm_starttime  {
        return Err(ContractError::NotStartedFarming{ });
    }

    let mut total_farm = TOTAL_FARMED.load(deps.storage)?;
    if farm_endtime < current_time || total_farm > Uint128::from(FARM_AMOUNT) {
        return Ok(Response::new()
            .add_attribute("action", "farm")
            .add_attribute("status", "full farmed"));
    }
//--------------------calc farming amount---------------------
    let mut total_as_usd = Uint128::zero();

    let all: StdResult<Vec<_>> = UST_USER_INFOS.range(deps.storage, None, None, 
        cosmwasm_std::Order::Ascending).collect();
    let all = all.unwrap();

    for x in all{
        let user_info = x.1; //(x/10^6) * (price / 10^2) /10^3 * 24 = x*price*24/10^-11
        let farm = user_info.amount * ust_price * Uint128::from(24u128) 
                                                / Uint128::from((10u64).pow(11u32));
        update_farm_info(deps.storage, user_info.wallet, farm)?;
        total_farm += farm;

        total_as_usd += user_info.amount * ust_price;
    }

    let all: StdResult<Vec<_>> = LUNA_USER_INFOS.range(deps.storage, None, None, 
        cosmwasm_std::Order::Ascending).collect();
    let all = all.unwrap();

    for x in all{
        let user_info = x.1; 
        let farm = user_info.amount * luna_price * Uint128::from(24u128) 
                                                / Uint128::from((10u64).pow(11u32));
        update_farm_info(deps.storage, user_info.wallet, farm)?;
        total_farm += farm;

        total_as_usd += user_info.amount * luna_price;
    }
    TOTAL_FARMED.save(deps.storage, &total_farm)?;
//-------------------recalc token price ------------------------------------
    //x/10^6) * (price / 10^2) / 20,000,000
    let multiple = total_as_usd / Uint128::from(100_000_000u128) / Uint128::from(20_000_000u128);
    //0.25*(1.2)^multiple = 25/10^2 * (12) ^ multiple) /(10^multiple) *10^2
    let price = Uint128::from(25 * (12u64).pow(multiple.u128() as u32) / 
                        (10u64).pow(multiple.u128() as u32));
    FARM_PRICE.save(deps.storage, &price)?;
//-----------------
    Ok(Response::new()
        .add_attribute("action", "farm")
    )
}

