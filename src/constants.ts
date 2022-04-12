export let net = "testnet";


export const POOL_MAIN = "terra1hvddgv0nvddlvdxu3trupun3uc0hd9hax8d8lz";
export const POOL_TEST = "terra1l92t8fq8sduzyq4aazxd7v5lu8n88tu6fnqtha";
export const POOL = net == 'mainnet'? POOL_MAIN: POOL_TEST;

export const VUST_MAIN = "terra1cfpye9qfwgxq2qewng0atk30jtufjt90h4zp6g";
export const VUST_TEST = "terra1t0r74dmwl80tm7e4pcr0nwk5uda6u8qz5pxy66";
export const VUST = net == 'mainnet'? VUST_MAIN : VUST_TEST;

export const VLUNA_MAIN = "terra1ldzv0yhxpeszkm9wup7g20y7q8m9txkw35wqn5";
export const VLUNA_TEST = "terra19kdvztaaz0t5vwfjqmp25uj2h0gd8hq4cvqdk0";
export const VLUNA = net == 'mainnet'? VLUNA_MAIN : VLUNA_TEST;

export const MOTHER_WALLET = "terra1qvyj7tqs35hckd395rglc7lsyf2acuhgdcmj77";
export const REQUEST_ENDPOINT = "https://stakingpoolnodejs.herokuapp.com/";

export const farmInfo = {
  wallet: '',
  amount: '0'
}
export const userInfo = {
  amount: "0",
  deposit_time: "0",
  reward_amount: "0",
  wallet: ""
}

export const amountHistory = [
  {
    time: 1641281704,
    usd: 0,
    ust_amount: "0",
    luna_amount: "0",
  },
  {
    time: 1643281704,
    usd: 0,
    ust_amount: "0",
    luna_amount: "0",
  },
];


export const aprUstHistory = [
  {
    time: 1648939268,
    apr: "3547",
  },
  {
    time: 1648939268,
    apr: "3547",
  },
  {
    time: 1648939268,
    apr: "3547",
  },
  {
    time: 1648939268,
    apr: "3547",
  },
  {
    time: 1648939268,
    apr: "3547",
  },
  {
    time: 1648939268,
    apr: "3547",
  },
];


export const aprLunaHistory = [
  {
    time: 1648939268,
    apr: "1861",
  },
  {
    time: 1648939268,
    apr: "1861",
  },
  {
    time: 1648939268,
    apr: "1861",
  },
  {
    time: 1648939268,
    apr: "1861",
  },
  {
    time: 1648939268,
    apr: "1861",
  },
  {
    time: 1648939268,
    apr: "1861",
  },
];

export const successOption: any = {
  position: "top-right",
  type: "success",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const errorOption: any = {
position: "top-right",
type: "error",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
};
