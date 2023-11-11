import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import IconButton from '@mui/material/IconButton';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { SxProps } from '@mui/system';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer(props: { select: (index: number) => void, courses: string[] }) {
  const [state, setState] = React.useState({
    left: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    props.select(index);
    //handleClick();
  };

  const [openDrawer, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const styles: SxProps = {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper',
  };

  const list = (anchor: Anchor) => (
    <ClickAwayListener onClickAway={handleClickAway}>
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      //onClick={toggleDrawer(anchor, openDrawer)}
      //onKeyDown={toggleDrawer(anchor, openDrawer)}
    >
      <List>
        {props.courses.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{
          "&.Mui-selected": {
            backgroundColor: "#a1a1a1"
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#a1a1a1"
          },
          ":hover": {
            backgroundColor: "#a1a1a1"
          }
        }} selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
    </ClickAwayListener>
  );
  
  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton sx={{ color: "#FFBF00", ml: 1}} aria-label="Menu" onClick={toggleDrawer(anchor, true)}><MenuIcon /></IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}