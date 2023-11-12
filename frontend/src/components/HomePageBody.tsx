import React from 'react';
import './HomePageBody.css';
import UserInputBar from '../components/UserInputBar';

import { COLORS } from '../constants';

function HomePageBody() {

  return (
    <div className="user-input" /*style = {{backgroundColor: COLORS.secondary}}*/>

        <div ><UserInputBar /></div>


    </div>
  );
}

export default HomePageBody;
export {};