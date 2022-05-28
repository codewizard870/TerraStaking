import React, { createContext, useContext, useReducer } from 'react'

import { floor, floorNormalize, getCoinId } from './Util'
import { amountHistory, userInfo, farmInfo, potInfo, balanceInfo, aprInfo, priceInfo, userInfos } from './constants'
import {getConfig} from "./config";

export type COINTYPE = 'USDC' | 'USDT' | 'DAI' | 'USN' | 'wBTC' | 'ETH' | 'wNEAR';
export type WALLETTYPE = 'near' | 'sender';

interface Action {
  type: ActionKind;
  payload: any;
}

export interface AppContextInterface {
  walletType: WALLETTYPE,
  loading: boolean,
  net: "mainnet" | "testnet",
  connected: Boolean,
  near: any,
  wallet: any | undefined,
  balance: number[],
  tab: "dashboard" | "mypage" | "earn" | "utility",
  openDepositModal: (() => void) | undefined,
  openWithdrawModal: (() => void) | undefined,
  openWaitingModal: (() => void) | undefined,
  closeWaitingModal: (() => void) | undefined,
  openConnectWalletModal: (()=>void) | undefined,
  coinType: COINTYPE,
  isPending: boolean,
  amountHistory: any[],
  apr: number[],
  price: number[],
  userInfos: any,
  farmPrice: number,
  farmInfo: any,
  farmStartTime: number,
  totalRewardsNear: number,
  txhash: string | undefined,
  qualified: boolean,
  potInfo: any,
}

const initialState: AppContextInterface = {
  walletType: 'near',
  loading: false,
  net: "testnet",
  connected: false,
  near: undefined,
  wallet: undefined,
  balance: balanceInfo,
  tab: 'dashboard',
  openDepositModal: undefined,
  openWithdrawModal: undefined,
  openWaitingModal: undefined,
  closeWaitingModal: undefined,
  openConnectWalletModal: undefined,
  coinType: 'USDC',
  isPending: false,
  amountHistory: amountHistory,
  apr: aprInfo,
  price: priceInfo,
  userInfos: userInfos,
  farmPrice: 25,
  farmInfo: farmInfo,
  farmStartTime: Date.now() / 1000,
  totalRewardsNear: 0,
  txhash: undefined,
  qualified: false,
  potInfo: potInfo,
}

export enum ActionKind{
  setWalletType,
  setLoading,
  setNet,
  setConnected,
  setNear,
  setWallet,
  setBalance,
  setTab,
  setOpenDepositModal,
  setOpenWithdrawModal,
  setOpenWaitingModal,
  setCloseWaitingModal,
  setOpenConnectWalletModal,
  setCoinType,
  setIsPending,
  setAmountHistory,
  setApr,
  setPrice,
  setUserInfos,
  setFarmPrice,
  setFarmInfo,
  setFarmStartTime,
  setTotalRewardsNear,
  setTxhash,
  setQualified,
  setPotInfo
}

const StoreContext = createContext<{ state: AppContextInterface; dispatch: React.Dispatch<any>; }>
({
  state: initialState,
  dispatch: () => null
});

export const reducer = (state: AppContextInterface,  action: Action ) => {
  switch (action.type) {
    case ActionKind.setWalletType:
      return { ...state, walletType: action.payload}
    case ActionKind.setLoading:
      return { ...state, loading: action.payload}
    case ActionKind.setNet:
      return { ...state, net: action.payload}
    case ActionKind.setConnected:
      return { ...state, connected: action.payload }
    case ActionKind.setNear:
      return { ...state, near: action.payload }
    case ActionKind.setWallet:
      return { ...state, wallet: action.payload }
    case ActionKind.setBalance:
      return { ...state, balance: action.payload }
    case ActionKind.setTab:
      return { ...state, tab: action.payload }
    case ActionKind.setOpenDepositModal:
      return { ...state, openDepositModal: action.payload}
    case ActionKind.setOpenWithdrawModal:
      return { ...state, openWithdrawModal: action.payload}
    case ActionKind.setOpenWaitingModal:
      return { ...state, openWaitingModal: action.payload}
    case ActionKind.setCloseWaitingModal:
      return { ...state, closeWaitingModal: action.payload}     
    case ActionKind.setOpenConnectWalletModal:
      return { ...state, openConnectWalletModal: action.payload}     
    case ActionKind.setCoinType:
      return { ...state, coinType: action.payload}
    case ActionKind.setIsPending:
      return {...state, isPending: action.payload}
    case ActionKind.setAmountHistory:
      return {...state, amountHistory: action.payload }
    case ActionKind.setApr:
      return {...state, apr: action.payload}
    case ActionKind.setPrice:
      return {...state, price: action.payload}
    case ActionKind.setUserInfos:
      return {...state, userInfos: action.payload}
    case ActionKind.setFarmPrice:
      return {...state, farmPrice: action.payload}
    case ActionKind.setFarmInfo:
      return {...state, farmInfo: action.payload}
    case ActionKind.setFarmStartTime:
      return {...state, farmStartTime: action.payload}
    case ActionKind.setTotalRewardsNear:
      return {...state, totalRewardsNear: action.payload}
    case ActionKind.setTxhash:
      return {...state, txhash: action.payload}
    case ActionKind.setQualified:
      return {...state, qualified: action.payload}
    case ActionKind.setPotInfo:
      return {...state, potInfo: action.payload}
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
export const useNear = () => {
  const {state, dispatch} = useStore();
  return state.near;
}

export const useNearBalance = () => {
  const {state, dispatch} = useStore();
  let balance = state.balance[0];
  return floorNormalize(balance);
}

export const useNearDeposited = () => {
  const {state, dispatch} = useStore();
  let balance = state.userInfos[0].amount;
  return floorNormalize(balance);
}

export const useNearApr = () => {
  const {state, dispatch} = useStore();
  const apr = state.apr[0];
  return apr;
}
export const useNearPrice = () => {
  const {state, dispatch} = useStore();
  const price = state.price[0];
  return price;
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
