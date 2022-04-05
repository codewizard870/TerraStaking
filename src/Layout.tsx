import React, {useEffect} from 'react'
import { Outlet, Link } from "react-router-dom";
import { VStack, Flex, useDisclosure, useEventListenerMap } from '@chakra-ui/react'
import Navbar from './Pages/Navbar'
import Footer from "./Pages/Footer";

import DepositModal from './Pages/DepositModal'
import {useStore, ActionKind} from './store'

const Layout = () => {
  const { isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit } = useDisclosure();
  const { isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw } = useDisclosure();
  const {state, dispatch} = useStore();

  useEffect( () => {
    dispatch({type: ActionKind.setOpenDepositModal, payload: onOpenDeposit});
    dispatch({type: ActionKind.setOpenWithdrawModal, payload: onOpenWithdraw});
  }, [dispatch, onOpenDeposit, onOpenWithdraw])

  return (
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
      <DepositModal isOpen={isOpenWithdraw} onClose={onCloseWithdraw} />
    </VStack>
  )
};
export default Layout;