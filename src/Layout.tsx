import { Outlet, Link } from "react-router-dom";
import { VStack, Flex } from '@chakra-ui/react'
import Navbar from './Pages/Navbar'
import Footer from "./Pages/Footer";

const Layout = () => {
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
    </VStack>
  )
};
export default Layout;