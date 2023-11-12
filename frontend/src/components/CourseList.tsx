import React, { useEffect, useState } from 'react';
import './CourseList.css';
import { ListItem, ListItemButton } from '@mui/material';
import { Course } from '../models/ApiModel';

import { createTheme, PaletteMode } from "@mui/material";
import { useColorTheme } from "../theme/use-color-theme";

import Typography from '@mui/material/Typography';

interface CourseListProps {
    courses: Course[]; 
    selectedIndex: number;
    onClick: (index: number) => void;
}

const getWindowDimensions = () => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    return { windowWidth, windowHeight };
  }

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

function CourseList(props: CourseListProps) {
    const { windowHeight } = useWindowDimensions();
    const value = useColorTheme();

    return (
        <>
            <div className="section-header">My Courses</div>
            <hr style={{ marginBottom: 0, borderColor: "#D9D9D9" }}/>
            <div className="course-list-container" style={{ height: 0.35 * windowHeight }}>
                {props.courses.map((course, index) => (
                    <ListItem key={course._id} disablePadding={true}>
                        <div 
                            className="course-item"
                            // style={{ backgroundColor: props.selectedIndex === index ? "#AF3030" : "rgba(0, 0, 0, 0)" }}
                        >
                            <ListItemButton 
                                sx={{
                                "&.Mui-focusVisible": {
                                    backgroundColor: props.selectedIndex === index ? "background.paper" : "background.default",
                                    color: "white"
                                },
                                ":hover": {
                                    backgroundColor: props.selectedIndex === index ? "background.paper" : "background.default",
                                    color: "white"
                                },
                                "&.MuiListItemButton-root": {
                                    backgroundColor: props.selectedIndex === index ? "background.paper" : "background.default"
                                }

                                }} 
                                onClick={() => props.onClick(index)}
                            >
                                <Typography variant="h6" component="div" align="left" sx={{ color: "text.primary", display: "flex", flexDirection: "column"}}>
                        
                                <Typography sx={{fontWeight: "600", fontSize: "large"}}>
                                    {course.name}
                                    </Typography>
                                    <Typography sx={{fontWeight: "600", fontSize: "small"}}>
                                    {course.instructor.name}
                                    </Typography>
                                </Typography>
                            {/* <div className="course-info">
                                <div className="course-name">{course.name}</div>
                                <div className="course-instructor">{course.instructor.name}</div>
                            </div> */}
                            </ListItemButton>
                        </div>
                    </ListItem>
                ))}
            </div>
        </>
    );
}

export default CourseList;