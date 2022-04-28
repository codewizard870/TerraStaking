#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_binary, Binary, Deps, Env, StdResult, Uint128
};

use crate::msg::{QueryMsg, Status, UserInfo, FarmInfo, PotInfo};
use crate::state::{ OWNER, TREASURY, UST_APR_HISTORY, UST_USER_INFOS, LUNA_APR_HISTORY, 
    LUNA_USER_INFOS, AMOUNT_HISTORY, VUST, VLUNA, FARM_INFOS, FARM_PRICE, FARM_STARTTIME, TOTAL_FARMED,
    UST_TOTAL_REWARDS, LUNA_TOTAL_REWARDS, POT_INFOS
};


#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetOwner{ } => {
            to_binary(&OWNER.load(deps.storage)?)
        },

        QueryMsg::GetTreasury{ } => {
            to_binary(&TREASURY.load(deps.storage)?)
        },
        
        QueryMsg::GetHistoryOfAprUst{ } => {
            to_binary(&UST_APR_HISTORY.load(deps.storage)?)
        },

        QueryMsg::GetUserInfoUst{ wallet } => {
            to_binary(&UST_USER_INFOS.load(deps.storage, wallet)?)
        },

        QueryMsg::GetUSTVoucher{ } => {
            to_binary(&VUST.load(deps.storage)?)
        },
//-----------------------------------------------------------------
        QueryMsg::GetHistoryOfAprLuna{ } => {
            to_binary(&LUNA_APR_HISTORY.load(deps.storage)?)
        },

        QueryMsg::GetUserInfoLuna{ wallet } => {
            to_binary(&LUNA_USER_INFOS.load(deps.storage, wallet)?)
        },

        QueryMsg::GetAmountHistory{ } => {
            to_binary(&AMOUNT_HISTORY.load(deps.storage)?)
        },

        QueryMsg::GetLUNAVoucher{ } => {
            to_binary(&VLUNA.load(deps.storage)?)
        }
//-------farm-------------------------------
        QueryMsg::GetFarmPrice{ } => {
            to_binary(&FARM_PRICE.load(deps.storage)?)
        },
        QueryMsg::GetFarmStarttime{ } => {
            to_binary(&FARM_STARTTIME.load(deps.storage)?)
        },
        QueryMsg::GetFarmInfo{ wallet } => {
            to_binary(&FARM_INFOS.load(deps.storage, wallet)?)
        },
        QueryMsg::GetTotalFarmed{ } => {
            to_binary(&TOTAL_FARMED.load(deps.storage)?)
        },
        QueryMsg::GetAllFarmInfo{ } => {
            let all: StdResult<Vec<_>> = FARM_INFOS.range(deps.storage, None, None, 
                cosmwasm_std::Order::Ascending).collect();
            let all = all.unwrap();
        
            let mut all_infos:Vec<FarmInfo> = Vec::new();
            for x in all{
                all_infos.push(x.1);
            }
            to_binary(&all_infos)
        },
        QueryMsg::GetPotInfo{ wallet } => {
            to_binary(&POT_INFOS.load(deps.storage, wallet)?)
        },
        QueryMsg::GetAllPotInfo{ } => {
            let all: StdResult<Vec<_>> = POT_INFOS.range(deps.storage, None, None, 
                cosmwasm_std::Order::Ascending).collect();
            let all = all.unwrap();
        
            let mut all_infos:Vec<PotInfo> = Vec::new();
            for x in all{
                all_infos.push(x.1);
            }
            to_binary(&all_infos)
        }
//-------for fast response-----------------------
        QueryMsg::GetStatus{ wallet } => {
            let res = UST_USER_INFOS.may_load(deps.storage, wallet.clone())?;
            let userinfo_ust = match res{
                Some(info) => { info },
                None => {
                    UserInfo{
                        wallet: wallet.clone(),
                        amount: Uint128::zero(),
                        reward_amount: Uint128::zero(),
                        deposit_time: Uint128::zero()
                    }
                }
            };

            let res = LUNA_USER_INFOS.may_load(deps.storage, wallet.clone())?;
            let userinfo_luna = match res{
                Some(info) => { info },
                None => {
                    UserInfo{
                        wallet: wallet.clone(),
                        amount: Uint128::zero(),
                        reward_amount: Uint128::zero(),
                        deposit_time: Uint128::zero()
                    }
                }
            };
            let res = FARM_INFOS.may_load(deps.storage, wallet.clone())?;
            let farm_info = match res{
                Some(info) => { info },
                None => {
                    FarmInfo{
                        wallet: wallet.clone(),
                        amount: Uint128::zero()
                    }
                }
            };
            let res = POT_INFOS.may_load(deps.storage, wallet.clone())?;
            let pot_info = match res{
                Some(info) => { info },
                None => {
                    PotInfo{
                        wallet: wallet.clone(),
                        ust_amount: Uint128::zero(),
                        luna_amount: Uint128::zero(),
                        qualified_ust_amount: Uint128::zero(),
                        qualified_luna_amount: Uint128::zero()
                    }
                }
            };
            let status = Status{
                amount_history: AMOUNT_HISTORY.load(deps.storage)?,
                apr_ust_history: UST_APR_HISTORY.load(deps.storage)?,
                apr_luna_history: LUNA_APR_HISTORY.load(deps.storage)?,
                userinfo_ust: userinfo_ust,
                userinfo_luna: userinfo_luna,
                farm_price: FARM_PRICE.load(deps.storage)?,
                farm_info: farm_info,
                farm_starttime: FARM_STARTTIME.load(deps.storage)?,
                total_rewards_ust: UST_TOTAL_REWARDS.load(deps.storage)?,
                total_rewards_luna: LUNA_TOTAL_REWARDS.load(deps.storage)?,
                pot_info: pot_info
            };
            to_binary(&status)
        }
    }
}