import * as React from 'react';
import './Drawer.css';

import { Box, Drawer, IconButton }  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import CourseList from './CourseList';
import AddCourse from './AddCourse';
import { Course, UserSchema } from '../models/ApiModel';

import Typography from '@mui/material/Typography';
import { post } from '../services/RestService';
import { useEffect, useState } from 'react';

export default function CourseDrawer(props: { select: (index: number, id: string) => void, user: UserSchema }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(props.user);

  useEffect(() => {
      post('/get-user', { "email": props.user.email! })
        .then((response: UserSchema) => setCurrentUser(response))
        .catch(error => console.log(error));
  }, []);

  const updateUser = () => {
    post('/get-user', { "email": props.user.email! })
        .then((response: UserSchema) => setCurrentUser(response))
        .catch(error => console.log(error));
  }

  const list = () => (
    <div className="drawer-container">
      <ClickAwayListener onClickAway={() => { setIsOpen(false) } }>
      <Box sx={{ width: 300 }} role="presentation">
        <CourseList 
          user={ currentUser ? currentUser : props.user }
          selectedIndex={selectedIndex}
          onClick={(index: number, id: string) => { setSelectedIndex(index); props.select(index, id); }}
        />
        <AddCourse user={ props.user } update={ updateUser }/>
      </Box>
      </ClickAwayListener>
    </div>
  );
  
  return (
    <div>
      <div className="drawer-title" onClick={() => { setIsOpen(true) }}>
        <IconButton sx={{ color: "text.primary", mb: 0.2, ml: 1 }} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1, color: "text.primary"}}>
        Select Courses
          </Typography>
        
      </div>
      <div style={{ flex: 1 }}></div>
      <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "background.secondary",
          color: "red",
        }
      }}
        anchor={'left'}
        open={isOpen}
        onClose={() => { setIsOpen(false) }}
      >
        { list() }
      </Drawer>
    </div>
  );
}