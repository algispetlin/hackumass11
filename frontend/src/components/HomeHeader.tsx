import React from 'react';
import './HomeHeader.css';
import AccountMenu from '../components/Profile';
import TemporaryDrawer from '../components/Drawer'

interface HomeHeaderProps {
    courseName: string;
}

function HomeHeader(props: HomeHeaderProps) {
  return (
    <div className="home-header">
        <div className='corner'>
          <TemporaryDrawer />
        </div>
        <div className='course-name'>{props.courseName}</div>
        <div className='corner'>
        </div>
<<<<<<< Updated upstream
        <><AccountMenu /></>
=======
        <>  <AccountMenu /></>
>>>>>>> Stashed changes
    </div>
  );
}

export default HomeHeader;