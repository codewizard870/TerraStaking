import React, { createContext, useContext, useEffect, useReducer, ReducerAction, ReactNode } from 'react'
import { ConnectedWallet } from '@terra-money/wallet-provider'
import { LCDClient } from '@terra-money/terra.js'
// import { Set2Mainnet, Set2Testnet } from './components/Util';


export const POOL_MAIN = "terra1hvddgv0nvddlvdxu3trupun3uc0hd9hax8d8lz";
export const POOL_TEST = "terra1hvddgv0nvddlvdxu3trupun3uc0hd9hax8d8lz";

interface Action {
  type: ActionKind;
  payload: any;
}

interface AppContextInterface {
  net: "mainnet" | "testnet",
  poolAddr: string,
  connected: Boolean,
  lcd: LCDClient,
  wallet: ConnectedWallet | undefined,
  uusdBalance: number,
  ulunaBalance: number,
  tab: "dashboard" | "mypage" | "earn" | "utility",
  openDepositModal: (() => void) | undefined,
  openWithdrawModal: (() => void) | undefined,
}
const initialState: AppContextInterface = {
  net: "testnet",
  poolAddr: POOL_MAIN, //mainnet v2.3
  connected: false,
  lcd: new LCDClient({ //mainnet
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5',
    gasPrices: { uusd: 0.45 },
  }),
  wallet: undefined,
  uusdBalance: 0,
  ulunaBalance: 0,
  tab: 'dashboard',
  openDepositModal: undefined,
  openWithdrawModal: undefined 
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
  setOpenWithdrawModal
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
    case ActionKind.setPoolAddr:
      return { ...state, poolAddr: action.payload }
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

export const useOpenDepositModal = () => {
  const {state, dispatch} = useStore();
  return state.openDepositModal;
}

export const useOpenWithdrawModal = () => {
  const {state, dispatch} = useStore();
  return state.openWithdrawModal;
}

export const useUSTBalance = () => {
  const {state, dispatch} = useStore();
  let balance = state.uusdBalance;
  balance = Math.floor(balance /(10 ** 6));
  return balance;
}

export const useLUNABalance = () => {
  const {state, dispatch} = useStore();
  let balance = state.ulunaBalance;
  balance = Math.floor(balance /(10 ** 6));
  return balance;
}