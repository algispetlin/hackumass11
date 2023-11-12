import React, { useEffect, useState } from 'react';
import './AddCourse.css';
import SearchIcon from '@mui/icons-material/Search';
import { ListItem, ListItemButton } from '@mui/material';
import { Course } from '../models/ApiModel';
import AddIcon from '@mui/icons-material/Add';


const coursesArr: Course[] = [
    { _id: "876543567", name: "CS220", instructor: { name: "Marius Minea", id: "223567544"} }, 
    { _id: "023654034", name: "CS230", instructor: { name: "Joe Chu", id: "367543766"} },
    { _id: "945400565", name: "CS240", instructor: { name: "Peter Haas", id: "436578746"} },
    { _id: "125634573", name: "CS250", instructor: { name: "David Barrington", id: "935667444"} },
    { _id: "094959756", name: "JOURN250", instructor: { name: "Steve Fox", id: "245647845"} },
    { _id: "709845805", name: "STATS515", instructor: { name: "Wei Zhu", id: "837249823"} } 
  ];

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


function AddCourse() {
    const { windowHeight } = useWindowDimensions();    
    const [results, setResults] = useState([] as Course[]);

    useEffect(() => {
        setResults(coursesArr);
    }, []);

    return (
        <>
            <div className="add-section-header">Add Course</div>
            <hr style={{ marginBottom: 0, borderColor: "#D9D9D9" }}/>
            <div className="search-container">
                <input 
                    id="searchCourses"
                    className="searchbar" 
                    placeholder='Search Courses...'
                    onKeyDown={event => { 
                        if(event.key === 'Enter') { 
                            let query = (document.getElementById("searchCourses")! as HTMLInputElement).value; 
                            console.log(query)
                            setResults(coursesArr);
                        }
                    }}
                ></input>
                <div 
                    style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={() => {
                        let query = (document.getElementById("searchCourses")! as HTMLInputElement).value; 
                        console.log(query);
                        setResults(coursesArr);
                        }}
                >
                    <SearchIcon sx={{ fontSize: 30, color: '#D9D9D9' }} />
                </div>
            </div>
            <div className="course-list-container" style={{ height: 0.35 * windowHeight }}>
                { results.map((course) => (
                    <ListItem key={course._id} disablePadding={true}>
                        <div 
                            className="course-item"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
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
                                onClick={() => console.log(course)}
                            >
                            <div className="course-info">
                                <div className="course-name">{course.name}</div>
                                <div className="course-instructor">{course.instructor.name}</div>
                            </div>
                            <div style={{ flex: 1 }}></div>
                            <AddIcon sx={{ color: '#D9D9D9'}}/>
                            </ListItemButton>
                        </div>
                    </ListItem>
                    ))
                }
            </div>
        </>
    );
}

export default AddCourse;