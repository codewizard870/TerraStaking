use cosmwasm_std::{Uint128, Addr};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cw20::Cw20ReceiveMsg;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Cw20HookMsg {
    /// Return stable coins to a user
    /// according to exchange rate
    WithdrawUst {wallet: Addr, ust_price: Uint128, luna_price: Uint128},
    WithdrawLuna {wallet: Addr, ust_price: Uint128, luna_price: Uint128},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: Option<String>,
    pub treasury: String,
    pub ust_apr: Uint128,
    pub luna_apr: Uint128,
    pub vust: Addr,
    pub vluna: Addr
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    Receive(Cw20ReceiveMsg),

    SetConfig {
        owner: Option<Addr>,
        treasury: Option<Addr>,
        vust: Option<Addr>,
        vluna: Option<Addr>
    },

    SetAprUst{
        apr: Uint128
    },

    DepositUst {
        qualified: bool,
    },

    RewardsUst{
    },
//------------------------------------------
    SetAprLuna{
        apr: Uint128
    },

    DepositLuna {
        qualified: bool,
    },

    RewardsLuna{
    },
//-----------FARM--------------------------------
    SetFarmStartTime{
        time: Uint128
    },
    Farm {
        ust_price: Uint128, //1.01 -> 101
        luna_price: Uint128 //300.11 -> 30011
    },
//------------Pot----------------------------
    PotProcess{}
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetOwner{ },
    GetTreasury{ },
    
    GetUSTVoucher{ },
    GetHistoryOfAprUst{ },
    GetUserInfoUst{ wallet: Addr },
//-------------------------------
    GetLUNAVoucher{ },
    GetHistoryOfAprLuna{ },
    GetUserInfoLuna{ wallet: Addr },

//--------------------------------
    GetAmountHistory{ },

//------Farm----------
    GetFarmPrice{ },
    GetFarmStarttime{ },
    GetFarmInfo{ wallet: Addr},
    GetTotalFarmed{ },
    GetAllFarmInfo{ },

//------Pot------------------
    GetPotInfo{ wallet: Addr },
    GetAllPotInfo{ },
//-----For fast response----------
    GetStatus{ wallet: Addr}
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct AprInfo{
	pub apr: Uint128,
    pub time: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct UserInfo{
	pub wallet: Addr,
	pub amount: Uint128,
	pub reward_amount: Uint128,
    pub deposit_time: Uint128
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct AmountInfo{
	pub ust_amount: Uint128,
    pub luna_amount: Uint128,
    pub ust_reward: Uint128,
    pub luna_reward: Uint128,
    pub time: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct FarmInfo{
    pub wallet: Addr,
	pub amount: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Status{
    pub amount_history: Vec<AmountInfo>,
    pub apr_ust_history: Vec<AprInfo>,
    pub apr_luna_history: Vec<AprInfo>,
    pub userinfo_ust: UserInfo,
    pub userinfo_luna: UserInfo,
    pub farm_price: Uint128,
    pub farm_info: FarmInfo,
    pub farm_starttime: Uint128,
    pub total_rewards_ust: Uint128,
    pub total_rewards_luna: Uint128,
    pub pot_info: PotInfo,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct PotInfo{
    pub wallet: Addr,
	pub ust_amount: Uint128,
    pub luna_amount: Uint128,
    pub qualified_ust_amount: Uint128,
    pub qualified_luna_amount: Uint128
}
