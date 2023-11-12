import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountMenu from '../components/Profile';
import CourseDrawer from '../components/Drawer';
import NightModeToggle from "../components/NightModeToggle";

import { Course, UserSchema } from '../models/ApiModel';
import { useEffect } from 'react';

export default function HomeHeaderMUI(props: { user: UserSchema, updateCourse: (id: string) => void }) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectCourse = (index: number, id: string) => {
    setSelectedIndex(index);
    props.updateCourse(id);
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <FormGroup>
      </FormGroup>
      <AppBar position="static" sx={{backgroundColor: "background.primary"}}>
        <Toolbar>
        <CourseDrawer select={selectCourse} user={props.user} />
          <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1, ml: 5, color: "text.primary"}}>
            <div>
              { props.user.courses! ? props.user.courses![selectedIndex].name : "Please Select a Course" }
            </div>  
          </Typography>
          <NightModeToggle />
          {/* <AccountMenu /> */}
          {/* {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}