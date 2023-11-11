import React from 'react';
import './HomeHeader.css';
import AccountMenu from '../components/Profile';

interface HomeHeaderProps {
    courseName: string;
}

function HomeHeader(props: HomeHeaderProps) {
  return (
    <div className="home-header">
        <div className='corner'>

        </div>
        <div className='course-name'>{props.courseName}</div>
        <div className='corner'>
            <AccountMenu />
        </div>
    </div>
  );
}

export default HomeHeader;