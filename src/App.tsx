import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VStack, Flex, useDisclosure, useEventListenerMap } from '@chakra-ui/react'

import Layout from './Layout';
import Dashboard from './Pages/Dashboard'
import MyPage from './Pages/MyPage'
import Earn from './Pages/Earn'
import Utility from './Pages/Utility'
import CommunityFarm from './Pages/CommunityFarm';
import PotReward from './Pages/PotReward';
import Terms from './Pages/Terms';

declare let document: any;

function App() {
  const [loading, setLoading] = useState(true);
  var FontFaceObserver = require('fontfaceobserver');

  var font = new FontFaceObserver('SF-Pro-Text');

  font.load().then(function () {
  //   console.log('My Family has loaded');
  //   let time = new Date();
  //   console.log(time.toLocaleTimeString());
  });
  //   let res = document.fonts.check('SF-Pro-Text')
  // console.log(res)

  document.fonts.onloadingdone = function (fontFaceSetEvent: any) {
    // alert('onloadingdone we have ' + fontFaceSetEvent.fontfaces.length + ' font faces loaded');
    console.log(fontFaceSetEvent)
    let time = new Date();
    console.log(time.toLocaleTimeString());

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  };

  return (
    <>
      {loading &&
        <Flex w='100%' h='100vh' justify='center' align='center' bg='black'>
          <video width="100%" autoPlay muted>
            <source src="./PRE LOADING WEB.mp4" type="video/mp4" />
          </video>
        </Flex>
      }
      {!loading && 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="mypage" element={<MyPage />} />
              <Route path="earn" element={<Earn />} />
              <Route path="utility" element={<Utility />} />
              <Route path="farm" element={<CommunityFarm />} />
              <Route path="pot" element={<PotReward />} />
              <Route path='terms' element={<Terms />} />
              <Route path="*" element={"404"} />
            </Route>
          </Routes>
        </BrowserRouter>
      }
    </>
  );
}

export default App;
