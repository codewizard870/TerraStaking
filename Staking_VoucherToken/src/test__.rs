use super::*;
use cosmwasm_std::{from_binary, Addr, Coin, Timestamp,
    BankQuery, BalanceResponse, AllBalanceResponse, Uint128, Api};
use cosmwasm_std::testing::{mock_env, mock_info, MOCK_CONTRACT_ADDR};

use crate::contract::{execute, instantiate, try_withdraw_ust};
use crate::contract_luna::{try_withdraw_luna};
use crate::query::{query};
use crate::msg::{QueryMsg, ExecuteMsg, InstantiateMsg, UserInfo, AprInfo, Status, FarmInfo};

use crate::mock_querier::{mock_dependencies};
// use terraswap::asset::{Asset, AssetInfo};
// use terraswap::pair::ExecuteMsg as TerraswapExecuteMsg;

#[test]
fn workflow_luna(){
    let mut deps = mock_dependencies(&[]);
    let mut env = mock_env();
    let mut info = mock_info("owner", &[]);
    const MONTH: u64 = 2592000; //60 * 60 * 24 * 30;
    let mut seconds = MONTH;
    env.block.time = Timestamp::from_seconds(seconds.clone());

    let msg = InstantiateMsg{
        owner: Some("owner".to_string()),
        ust_apr: Uint128::from(2000u128),
        luna_apr: Uint128::from(1000u128),
        treasury: "treasury".to_string(),
        vust: Addr::unchecked("vust".to_string()),
        vluna: Addr::unchecked("vluna".to_string()),
    };
//instantiate
    let res = instantiate(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();

//deposit
    info.sender = Addr::unchecked("user1".to_string());
    info.funds = vec![Coin{denom: "uluna".to_string(), amount: Uint128::from(10_000_000u128)}];
    seconds += MONTH;
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = ExecuteMsg::DepositLuna {  };

    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
    println!("deposit{:?}\n", res);

//rewards
    info.sender = Addr::unchecked("treasury".to_string());
    let msg = ExecuteMsg::RewardsLuna{ };
    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
    println!("rewards{:?}\n", res);

//farm
    info.sender = Addr::unchecked("treasury".to_string());
    let msg = ExecuteMsg::Farm{ust_price: Uint128::from(1000u128), luna_price: Uint128::from(8000u128) };
    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
    println!("Farm {:?}\n", res);

//get farm info
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = QueryMsg::GetFarmInfo{wallet: Addr::unchecked("user1".to_string())};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let res: FarmInfo = from_binary(&res).unwrap();
    println!("Farm info {:?}\n", res );

//get user info
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = QueryMsg::GetUserInfoLuna{wallet: Addr::unchecked("user1".to_string())};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let res: UserInfo = from_binary(&res).unwrap();
    println!("User info {:?}\n", res );

//withdraw
    info.sender = Addr::unchecked("treasury".to_string());
    let res = try_withdraw_luna(deps.as_mut(), env.clone(), Addr::unchecked("user1".to_string()),
        Uint128::from(5_000_000u128), Uint128::from(1000u128), Uint128::from(8000u128)).unwrap();

    println!("withdraw {:?}\n", res);

//get farm info
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = QueryMsg::GetFarmInfo{wallet: Addr::unchecked("user1".to_string())};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let res: FarmInfo = from_binary(&res).unwrap();
    println!("Farm info {:?}\n", res );

//get user info
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = QueryMsg::GetUserInfoLuna{wallet: Addr::unchecked("user1".to_string())};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let res: UserInfo = from_binary(&res).unwrap();
    println!("User info {:?}\n", res );
//set apr
    info.sender = Addr::unchecked("owner".to_string());
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = ExecuteMsg::SetAprLuna {apr: Uint128::from(4000u128) };

    let res = execute(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();
    println!("set apr{:?}\n", res);
//-------------------
    env.block.time = Timestamp::from_seconds(seconds.clone());

//get apr
    let msg = QueryMsg::GetHistoryOfAprLuna{};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let apr_infos: Vec<AprInfo> = from_binary(&res).unwrap();
    println!("ust apr info: {:?}\n", apr_infos);

//get user info
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = QueryMsg::GetUserInfoLuna{wallet: Addr::unchecked("user1".to_string())};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let res: UserInfo = from_binary(&res).unwrap();
    println!("User info {:?}\n", res );
    
//get status
    env.block.time = Timestamp::from_seconds(seconds.clone());
    let msg = QueryMsg::GetStatus{wallet: Addr::unchecked("user1".to_string())};
    let res = query(deps.as_ref(), env.clone(), msg).unwrap();
    let res: Status = from_binary(&res).unwrap();
    println!("Status {:?}\n", res );
}

