import React from 'react';
import './HomePageBody.css';
import UserInputBar from '../components/UserInputBar';

interface HomePageBodyProps {

}

function HomePageBody(props: HomePageBodyProps) {

  return (
    <div className="user-input">
        <div className='corner'>
        </div>
        <div ><UserInputBar /></div>
        <div className='corner'>
        </div>
    </div>
  );
}

export default HomePageBody;
export {};