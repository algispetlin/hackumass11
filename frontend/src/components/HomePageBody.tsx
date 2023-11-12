import React from 'react';
import './HomePageBody.css';
import UserInputBar from '../components/UserInputBar';
import { UserSchema } from '../models/ApiModel';

function HomePageBody(props: { user: UserSchema }) {
  return (
    <>
      <UserInputBar user={ props.user }/>
    </>
  );
}

export default HomePageBody;