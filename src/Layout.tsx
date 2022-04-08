import React, {useEffect, useMemo} from 'react'
import { QueryClient, QueryClientProvider, useInfiniteQuery } from "react-query"
import { Outlet, Link } from "react-router-dom";
import { VStack, Flex, useDisclosure, useEventListenerMap } from '@chakra-ui/react'
import Navbar from './Pages/Navbar'
import Footer from "./Pages/Footer";

import DepositModal from './Pages/DepositModal'
import WithdrawModal from './Pages/WithdrawModal'
import { useLCD, useWallet, useTerraAPIURL, useStore, useNetworkName, ActionKind } from './store';
import {fetchData} from './Util';

const Layout = () => {
  const networkName = useNetworkName();
  const queryClient = useQueryClient();

  const { isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit } = useDisclosure();
  const { isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw } = useDisclosure();
  const {state, dispatch} = useStore();
  const lcd =  useLCD();

  useEffect( () => {
    dispatch({type: ActionKind.setOpenDepositModal, payload: onOpenDeposit});
    dispatch({type: ActionKind.setOpenWithdrawModal, payload: onOpenWithdraw});
  }, [dispatch, onOpenDeposit, onOpenWithdraw])

  useEffect( () => {
    const fetchAll = async () => {
      await fetchData(state, dispatch)
    }
    fetchAll()
  }, [lcd])

  return (
    <QueryClientProvider client={queryClient} key={networkName}>
      <VStack
        background={'black'}
        fontFamily={'SF Pro'}
        color={'white'}
        spacing={'10px'}
      >
        <Navbar />
        <Outlet />
        <Footer />
        <DepositModal isOpen={isOpenDeposit} onClose={onCloseDeposit} />
        <WithdrawModal isOpen={isOpenWithdraw} onClose={onCloseWithdraw} />
      </VStack>
    </QueryClientProvider>
  )
};
export default Layout;


const useQueryClient = () => {
  const name = useNetworkName()

  return useMemo(() => {
    if (!name) throw new Error()
    return new QueryClient()
  }, [name])
}
