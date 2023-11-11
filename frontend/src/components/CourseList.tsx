import React from 'react';
import './CourseList.css';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface CourseListProps {
    courses: string[]; 
    selectedIndex: number;
    onClick: (index: number) => void;
}

const colorSelected = (bool: boolean) => bool ? "yellow" : "blue";

function CourseList(props: CourseListProps) {
    return (
        <List>
          {props.courses.map((text, index) => (
            <ListItem key={text} disablePadding={true}>
                <div>
                    <ListItemButton 
                        sx={{
                        "&.Mui-selected": {
                            backgroundColor: "#AF3030"
                        },
                        "&.Mui-focusVisible": {
                            backgroundColor: "#a1a1a1"
                        },
                        "&.Mui-disabled": {
                            backgroundColor: "black"
                        },
                        ":hover": {
                            backgroundColor: "#F15C5C"
                        }

                        }} 
                        selected={props.selectedIndex === index}
                        //disabled={props.selectedIndex === index}
                        onClick={() => props.onClick(index)}
                    >
                    <ListItemText primary={text} />
                    </ListItemButton>
                </div>
            </ListItem>
          ))}
        </List>
    );
}

export default CourseList;