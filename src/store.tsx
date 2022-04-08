import React, { createContext, useContext, useEffect, useReducer, useMemo, useCallback } from 'react'
import axios from "axios"
import { ConnectedWallet } from '@terra-money/wallet-provider'
import { LCDClient } from '@terra-money/terra.js'
// import { Set2Mainnet, Set2Testnet } from './components/Util';
import {  useQuery } from "react-query"

import { amountHistory, aprUstHistory, aprLunaHistory, userInfo } from './constants'

export type COINTYPE = 'ust' | 'luna';

interface Action {
  type: ActionKind;
  payload: any;
}

export interface AppContextInterface {
  net: "mainnet" | "testnet",
  connected: Boolean,
  lcd: LCDClient,
  wallet: ConnectedWallet | undefined,
  uusdBalance: number,
  ulunaBalance: number,
  tab: "dashboard" | "mypage" | "earn" | "utility",
  openDepositModal: (() => void) | undefined,
  openWithdrawModal: (() => void) | undefined,
  coinType: COINTYPE,
  isPending: boolean,
  amountHistory: any,
  aprUstHistory: any,
  aprLunaHistory: any,
  ustPrice: number,
  lunaPrice: number,
  userInfoUst: any,
  userInfoLuna: any,
}

const initialState: AppContextInterface = {
  net: "testnet",
  connected: false,
  lcd: new LCDClient({ //
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5',
    gasPrices: { uusd: 0.45 },
  }),
  wallet: undefined,
  uusdBalance: 0,
  ulunaBalance: 0,
  tab: 'dashboard',
  openDepositModal: undefined,
  openWithdrawModal: undefined,
  coinType: 'ust',
  isPending: false,
  amountHistory: amountHistory,
  aprUstHistory: aprUstHistory,
  aprLunaHistory: aprLunaHistory,
  ustPrice: 1,
  lunaPrice: 109,
  userInfoUst: userInfo,
  userInfoLuna: userInfo
}

export enum ActionKind{
  setNet,
  setPoolAddr,
  setLcd,
  setConnected,
  setWallet,
  setUusdBalance,
  setUlunaBalance,
  setTab,
  setOpenDepositModal,
  setOpenWithdrawModal,
  setCoinType,
  setIsPending,
  setAmountHistory,
  setAprUstHistory,
  setAprLunaHistory,
  setUstPrice,
  setLunaPrice,
  setUserInfoUst,
  setUserInfoLuna
}

const StoreContext = createContext<{ state: AppContextInterface; dispatch: React.Dispatch<any>; }>
({
  state: initialState,
  dispatch: () => null
});

export const reducer = (state: AppContextInterface,  action: Action ) => {
  switch (action.type) {
    case ActionKind.setNet:
      return { ...state, net: action.payload}
    case ActionKind.setConnected:
      return { ...state, connected: action.payload }
    case ActionKind.setLcd:
      return { ...state, lcd: action.payload }
    case ActionKind.setWallet:
      return { ...state, wallet: action.payload }
    case ActionKind.setUusdBalance:
      return { ...state, uusdBalance: action.payload }
    case ActionKind.setUlunaBalance:
      return { ...state, ulunaBalance: action.payload }
    case ActionKind.setTab:
      return { ...state, tab: action.payload }
    case ActionKind.setOpenDepositModal:
      return { ...state, openDepositModal: action.payload}
    case ActionKind.setOpenWithdrawModal:
      return { ...state, openWithdrawModal: action.payload}
    case ActionKind.setCoinType:
      return { ...state, coinType: action.payload}
    case ActionKind.setIsPending:
      return {...state, isPending: action.payload}
    case ActionKind.setAmountHistory:
      return {...state, amountHistory: action.payload }
    case ActionKind.setAprUstHistory:
      return {...state, aprUstHistory: action.payload}
    case ActionKind.setAprLunaHistory:
      return {...state, aprLunaHistory: action.payload}
    case ActionKind.setUstPrice:
      return {...state, ustPrice: action.payload}
    case ActionKind.setLunaPrice:
      return {...state, lunaPrie: action.payload}
    case ActionKind.setUserInfoUst:
      return {...state, userInfoUst: action.payload}
    case ActionKind.setUserInfoLuna:
      return {...state, userInfoLuna: action.payload}
    default:
      return state
  }
}

export const StoreProvider: React.FC = ({ children}) => 
{
  const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(()=>{
  //   let net = window.localStorage.getItem('net') || "mainnet";
  //   if( net == "testnet" ){
  //     Set2Testnet(state, dispatch);
  //   }
  //   else{
  //     Set2Mainnet(state, dispatch);
  //   }
  // }, []);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
export const useWallet = () => {
  const {state, dispatch} = useStore();
  return state.wallet;
}
export const useLCD = () => {
  const {state, dispatch} = useStore();
  return state.lcd;
}

export const useTerraAPIURL = () => {
  const {state, dispatch} = useStore();

  let baseURL: string;
  if(state.net == 'mainnet')
    baseURL =  "https://api.terra.dev";
  else
    baseURL = "https://bombay-api.terra.dev";

  return baseURL;
}

export const useNetworkName = () => {
  const {state, dispatch} = useStore();
  return state.net;
}

export const useUSTBalance = () => {
  const {state, dispatch} = useStore();
  let balance = state.uusdBalance;
  balance = Math.floor(balance /(10 ** 5)) / 10;
  return balance;
}

export const useLUNABalance = () => {
  const {state, dispatch} = useStore();
  let balance = state.ulunaBalance;
  balance = Math.floor(balance /(10 ** 5)) / 10;
  return balance;
}

export const useUSTDeposited = () => {
  const {state, dispatch} = useStore();
  let balance = state.userInfoUst.amount;
  balance = Math.floor(balance /(10 ** 5)) / 10;
  return balance;
}

export const useLUNADeposited = () => {
  const {state, dispatch} = useStore();
  let balance = state.userInfoLuna.amount;
  balance = Math.floor(balance /(10 ** 5)) / 10;
  return balance;
}

export const useUSTApr = () => {
  const {state, dispatch} = useStore();
  const data = state.aprUstHistory;
  const last = data.length - 1;
  const apr = parseInt(data[last].apr) / 100;
  return apr;
}

export const useLUNAApr = () => {
  const {state, dispatch} = useStore();
  const data = state.aprLunaHistory;
  const last = data.length - 1;
  const apr = parseInt(data[last].apr) / 100;
  return apr;
}

export const useUSTPrice = () => {
  const {state, dispatch} = useStore();
  return state.ustPrice;
}

export const useLUNAPrice = () => {
  const {state, dispatch} = useStore();
  return state.lunaPrice;
}

export const useExchangeRate = () => {
  const {state, dispatch} = useStore();
  return state.lunaPrice/state.ustPrice;
}

export const OpenDepositModal = (state:AppContextInterface , dispatch: React.Dispatch<any>, type: COINTYPE) => {
  dispatch({type: ActionKind.setCoinType, payload: type});

  if(state.openDepositModal != undefined)
    state.openDepositModal()
}

export const OpenWithdrawModal = (state:AppContextInterface , dispatch: React.Dispatch<any>, type: COINTYPE) => 
{
  dispatch({type: ActionKind.setCoinType, payload: type});

  if(state.openWithdrawModal != undefined)
    state.openWithdrawModal()
}

// const baseURL = "https://api.coingecko.com/api/v3/";

// export const useUstPrice = () => { 
//   const fetch = useCallback(
//     async () =>{
//       const res = await axios.get(
//          `simple/price?ids=terrausd&vs_currencies=usd`,
//          { baseURL }
//        );
//      return res;
//     },
//     []
//   )
//   const {data, isFetched} =  useQuery(
//     "terrausd",
//     fetch,
//     { staleTime: Infinity, retry: false }
//   )
//   if(isFetched)
//     return parseFloat(data?.data.terrausd.usd);
//   return 1;
// }

// export const useLunaPrice = () => { 
//   const fetch = useCallback(
//     async () =>{
//       const res = await axios.get(
//          `simple/price?ids=terra-luna&vs_currencies=usd`,
//          { baseURL }
//        );
//      return res;
//     },
//     []
//   )
//   const {data, isFetched} =  useQuery(
//     "terraluna",
//     fetch,
//     { staleTime: Infinity, retry: false }
//   )
//   if(isFetched)
//     return parseFloat(data?.data["terra-luna"].usd);

//   return 109;
// }

