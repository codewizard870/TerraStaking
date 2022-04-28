use crate::error::ContractError;

use cosmwasm_std::{ Storage, Uint128, Addr, StdResult, StdError, Response, Env, MessageInfo};
use cw20::{Cw20ExecuteMsg, Cw20QueryMsg, BalanceResponse as Cw20BalanceResponse, TokenInfoResponse};

use crate::state::{ OWNER, TREASURY, UST_APR_HISTORY, UST_USER_INFOS, 
    LUNA_APR_HISTORY, LUNA_USER_INFOS, AMOUNT_HISTORY, FARM_INFOS, FARM_STARTTIME, TOTAL_FARMED,
    UST_TOTAL_REWARDS, LUNA_TOTAL_REWARDS, POT_INFOS
};
use crate::contract::{FARM_PERIOD, FARM_AMOUNT};
use crate::msg::{UserInfo, AprInfo, AmountInfo, PotInfo};

pub fn check_onlyowner(storage: &dyn Storage, sender: Addr) -> Result<Response, ContractError> {
    let owner = OWNER.load(storage)?;
    if owner != sender {
        return Err(ContractError::Unauthorized{});
    }
    Ok(Response::new())
}

pub fn check_onlytreasury(storage: &dyn Storage, sender: Addr) -> Result<Response, ContractError> {
    let treasury = TREASURY.load(storage)?;
    if treasury != sender {
        return Err(ContractError::Unauthorized{});
    }
    Ok(Response::new())
}

pub fn get_ust_apr(storage: &dyn Storage)
    ->StdResult<Uint128>
{
    let ust_apr_history = UST_APR_HISTORY.load(storage)?;
    let index = ust_apr_history.len() - 1;
    Ok(ust_apr_history[index].apr)
}

pub fn get_luna_apr(storage: &dyn Storage)
    ->StdResult<Uint128>
{
    let luna_apr_history = LUNA_APR_HISTORY.load(storage)?;
    let index = luna_apr_history.len() - 1;
    Ok(luna_apr_history[index].apr)
}

pub fn append_amount_history(storage: &mut dyn Storage, env: Env, ust_amount: Uint128, luna_amount: Uint128, bAdd: bool)
    -> StdResult<bool>
{
    let mut amount_history = AMOUNT_HISTORY.load(storage)?;
    if amount_history.len() == 0 {
        amount_history.push(AmountInfo{
            ust_amount,
            luna_amount,
            ust_reward: Uint128::zero(),
            luna_reward: Uint128::zero(),
            time: env.block.time.seconds()
        });
    } else {
        let last_index = amount_history.len() - 1;
        let mut info = amount_history[last_index].clone();
        if bAdd {
            info.ust_amount += ust_amount;
            info.luna_amount += luna_amount;
        } else {
            info.ust_amount -= ust_amount;
            info.luna_amount -= luna_amount;
        }
        info.time = env.block.time.seconds();
        info.ust_reward = UST_TOTAL_REWARDS.load(storage)?;
        info.luna_reward = LUNA_TOTAL_REWARDS.load(storage)?;

        amount_history.push(info);

        if last_index > 50 {
            let mut retain = vec![true; amount_history.len()];
            retain[0] = false;

            let mut iter = retain.iter();
            amount_history.retain(|_| *iter.next().unwrap());
        }
    }

    AMOUNT_HISTORY.save(storage, &amount_history)?;
    Ok(true)
}

pub fn farm_withdraw(
    storage: &mut dyn Storage,
    env: Env,
    wallet: Addr,
    ust_amount: Uint128,
    luna_amount: Uint128,
    ust_price: Uint128,
    luna_price: Uint128
)
    -> Result<Response, ContractError>
{
    let current_time = Uint128::from(env.block.time.seconds() as u128);
    let farm_starttime = FARM_STARTTIME.load(storage)?;
    let farm_endtime = farm_starttime + Uint128::from(FARM_PERIOD);

//-----------------condition check------------------------------
    if farm_starttime == Uint128::zero() || current_time < farm_starttime  {
        return Ok(Response::new());
    }

    if farm_endtime < current_time {
        return Ok(Response::new()
            .add_attribute("action", "farm withdraw")
            .add_attribute("status", "full farmed"));
    }
//-----------------No farm yet------------------------
    let res = FARM_INFOS.may_load(storage, wallet.clone())?;
    if res == None {
        return Ok(Response::new())
    }

//--------------------calc farming amount---------------------
    let mut total_farm = TOTAL_FARMED.load(storage)?;
    let mut farm_info = FARM_INFOS.load(storage, wallet.clone())?;
    let mut total_as_usd = Uint128::zero();

    let res = UST_USER_INFOS.may_load(storage, wallet.clone())?;
    match res{
        Some(user_info) => {
            total_as_usd += user_info.amount * ust_price;
        },
        None =>{ }
    }

    let res = LUNA_USER_INFOS.may_load(storage, wallet.clone())?;
    match res{
        Some(user_info) => {
            total_as_usd += user_info.amount * luna_price;
        },
        None =>{ }
    }

    if total_as_usd > Uint128::zero() {
        let mut withdraw_as_usd = ust_amount * ust_price + luna_amount * luna_price;

        if withdraw_as_usd > total_as_usd {
            withdraw_as_usd = total_as_usd;
        }
        
        let withdraw_amount = withdraw_as_usd * farm_info.amount/total_as_usd;

        farm_info.amount -= withdraw_amount;
        total_farm -= withdraw_amount;
        
        FARM_INFOS.save(storage, wallet, &farm_info)?;
        TOTAL_FARMED.save(storage, &total_farm)?;
    }
//-----------------
    Ok(Response::new()
        .add_attribute("action", "farm")
    )
}

pub fn deposit_potinfo(storage: &mut dyn Storage, wallet: Addr, ust_amount: Uint128, luna_amount: Uint128, qualified: bool)
-> StdResult<bool>
{
    let res = POT_INFOS.may_load(storage, wallet.clone())?;
    let mut pot_info = match res{
        Some(info) => {
            info
        },
        None => PotInfo{
            wallet: wallet.clone(),
            ust_amount: Uint128::zero(),
            luna_amount: Uint128::zero(),
            qualified_ust_amount: Uint128::zero(),
            qualified_luna_amount: Uint128::zero()
        }
    };
    if qualified {
        pot_info.qualified_ust_amount += ust_amount;
        pot_info.qualified_luna_amount += luna_amount;
    } else {
        pot_info.ust_amount += ust_amount;
        pot_info.luna_amount += luna_amount;
    }
    
    POT_INFOS.save(storage, wallet.clone(), &pot_info)?;
    Ok(true)
}
pub fn withdraw_potinfo(storage: &mut dyn Storage, wallet: Addr, ust_amount: Uint128, luna_amount: Uint128)
-> StdResult<bool>
{
    let res = POT_INFOS.may_load(storage, wallet.clone())?;
    if res == None{
        return Ok(true);
    }

    let mut _ust_amount = ust_amount;
    let mut pot_info = POT_INFOS.load(storage, wallet.clone())?;
    if pot_info.qualified_ust_amount >= _ust_amount {
        pot_info.qualified_ust_amount -= _ust_amount;
    }else {
        pot_info.qualified_ust_amount = Uint128::zero();
        _ust_amount -= pot_info.qualified_ust_amount;

        if pot_info.ust_amount >= _ust_amount {
            pot_info.ust_amount -= _ust_amount;
        }else{
            pot_info.ust_amount = Uint128::zero();
        }
    }

    let mut _luna_amount = luna_amount;
    if pot_info.qualified_luna_amount >= _luna_amount {
        pot_info.qualified_luna_amount -= _luna_amount;
    }else {
        pot_info.qualified_luna_amount = Uint128::zero();
        _luna_amount -= pot_info.qualified_luna_amount;

        if pot_info.luna_amount >= _luna_amount {
            pot_info.luna_amount -= _luna_amount;
        }else{
            pot_info.luna_amount = Uint128::zero();
        }
    }

    POT_INFOS.save(storage, wallet.clone(), &pot_info)?;
    Ok(true)
}

pub fn pot_process( storage: &mut dyn Storage, info: MessageInfo )
    -> Result<Response, ContractError>
{
    check_onlytreasury(storage, info.sender)?;

    let all: StdResult<Vec<_>> = POT_INFOS.range(storage, None, None, 
        cosmwasm_std::Order::Ascending).collect();
    let all = all.unwrap();

    for x in all{
        let mut pot_info = x.1;

        pot_info.qualified_ust_amount = pot_info.ust_amount;
        pot_info.qualified_luna_amount = pot_info.luna_amount;
        pot_info.ust_amount = Uint128::zero();
        pot_info.luna_amount = Uint128::zero();
        
        if pot_info.qualified_ust_amount == Uint128::zero() &&
            pot_info.qualified_luna_amount == Uint128::zero() 
        {
            POT_INFOS.remove(storage, pot_info.wallet.clone());
        }
        else{
            POT_INFOS.save(storage, pot_info.wallet.clone(), &pot_info)?;
        }
    }
    
    Ok(Response::new()
        .add_attribute("action", "rewards")
    )
}