import React from 'react';
import './HomeHeader.css';

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

        </div>
    </div>
  );
}

export default HomeHeader;