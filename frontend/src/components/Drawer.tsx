import * as React from 'react';
import './Drawer.css';

import { Box, Drawer, IconButton }  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import CourseList from './CourseList';
import AddCourse from './AddCourse';
import { Course } from '../models/ApiModel';

import Typography from '@mui/material/Typography';

export default function CourseDrawer(props: { select: (index: number) => void, courses: Course[] }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const list = () => (
    <div className="drawer-container">
      <ClickAwayListener onClickAway={() => { setIsOpen(false) } }>
      <Box sx={{ color: "text.primary", width: 300 }} role="presentation">
        <CourseList 
          courses={props.courses}
          selectedIndex={selectedIndex}
          onClick={(index: number) => { setSelectedIndex(index); props.select(index); }}
        />
        <AddCourse />
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
        anchor={'left'}
        open={isOpen}
        onClose={() => { setIsOpen(false) }}
      >
        { list() }
      </Drawer>
    </div>
  );
}