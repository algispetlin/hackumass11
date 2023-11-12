import React from 'react';
import './HomePageBody.css';
import UserInputBar from '../components/UserInputBar';
import { UserSchema } from '../models/ApiModel';

function HomePageBody(props: { user: UserSchema, course: string }) {
  return (
    <>
      <UserInputBar user={ props.user } course={ props.course }/>
    </>
  );
}

export default HomePageBody;