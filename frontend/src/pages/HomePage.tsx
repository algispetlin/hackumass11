import React from 'react';
import HomeHeader from '../components/HomeHeader';
import HomeHeaderMUI from '../components/HomeHeaderMUI';
import HomePageBody from '../components/HomePageBody';

function HomePage() {
  return (
    <>
        <CssBaseline />
        {/* <HomeHeader /> */}
        <HomeHeaderMUI />
        <HomePageBody />
    </>
  );
}

export default HomePage;