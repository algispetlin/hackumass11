import React, { useEffect, useState } from 'react';
import './CourseList.css';
import { ListItem, ListItemButton } from '@mui/material';
import { Course } from '../models/ApiModel';

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

    return (
        <>
            <div className="section-header">My Courses</div>
            <hr style={{ marginBottom: 0, borderColor: "#D9D9D9" }}/>
            <div className="course-list-container" style={{ height: 0.35 * windowHeight }}>
                {props.courses.map((course, index) => (
                    <ListItem key={course._id} disablePadding={true}>
                        <div 
                            className="course-item"
                            style={{ backgroundColor: props.selectedIndex === index ? "#AF3030" : "rgba(0, 0, 0, 0)" }}
                        >
                            <ListItemButton 
                                sx={{
                                "&.Mui-focusVisible": {
                                    backgroundColor: "#F15C5C",
                                    color: "white"
                                },
                                ":hover": {
                                    backgroundColor: "#CD5858",
                                    color: "white"
                                }

                                }} 
                                onClick={() => props.onClick(index)}
                            >
                            <div className="course-info">
                                <div className="course-name">{course.name}</div>
                                <div className="course-instructor">{course.instructor.name}</div>
                            </div>
                            </ListItemButton>
                        </div>
                    </ListItem>
                ))}
            </div>
        </>
    );
}

export default CourseList;