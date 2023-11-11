import * as React from 'react';
import './Drawer.css';

import { Box, Drawer, IconButton }  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import CourseList from './CourseList';
import AddCourse from './AddCourse';

export default function CourseDrawer(props: { select: (index: number) => void, courses: string[] }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const list = () => (
    <div className="drawer-container">
      <ClickAwayListener onClickAway={() => { setIsOpen(false) } }>
      <Box sx={{ width: 300 }} role="presentation">
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
        <IconButton sx={{ color: "#E5E5E5", mt: 0.2, ml: 1 }} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        Select Classes
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