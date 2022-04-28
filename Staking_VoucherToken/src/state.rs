use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::{Addr, Uint128, Coin, StdResult, DepsMut};
use cw_storage_plus::{Item, Map, U128Key};
use crate::msg::{UserInfo, AprInfo, AmountInfo, FarmInfo, PotInfo};

pub const OWNER: Item<Addr> = Item::new("owner");
pub const TREASURY: Item<Addr> = Item::new("treasury wallet");
pub const VUST: Item<Addr> = Item::new("voucher for ust");
pub const VLUNA: Item<Addr> = Item::new("voucher for luna");

pub const UST_APR_HISTORY: Item<Vec<AprInfo>> = Item::new("history of ust apr");
pub const UST_USER_INFOS: Map<Addr, UserInfo> = Map::new("UST user infos");
pub const UST_TOTAL_REWARDS: Item<Uint128> = Item::new("total ust rewards");

pub const LUNA_APR_HISTORY: Item<Vec<AprInfo>> = Item::new("history of luna apr");
pub const LUNA_USER_INFOS: Map<Addr, UserInfo> = Map::new("LUNA user infos");
pub const LUNA_TOTAL_REWARDS: Item<Uint128> = Item::new("total luna rewards");

pub const AMOUNT_HISTORY: Item<Vec<AmountInfo>> = Item::new("Amount history");

//--------farm-----------------
pub const FARM_STARTTIME: Item<Uint128> = Item::new("farm start time");
pub const FARM_PRICE: Item<Uint128> = Item::new("farm token price");
pub const FARM_INFOS: Map<Addr, FarmInfo> = Map::new("farm info");
pub const TOTAL_FARMED: Item<Uint128> = Item::new("total farmed amount");

//--------qualify----------------------
pub const POT_INFOS: Map<Addr, PotInfo> = Map::new("pot infos");