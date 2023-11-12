import React, { useEffect, useState } from 'react';
import './AddCourse.css';
import SearchIcon from '@mui/icons-material/Search';
import { ListItem, ListItemButton } from '@mui/material';
import { Course } from '../models/ApiModel';
import AddIcon from '@mui/icons-material/Add';

import { post } from '../services/RestService';

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
        post('/course-search', { "userId": "65508cad9d5aad0ca635088f", "query": "" })
            .then(response => setResults(response))
            .catch(error => console.log(error));
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
                    onKeyDown={async (event) => { 
                        if(event.key === 'Enter') { 
                            let query = (document.getElementById("searchCourses")! as HTMLInputElement).value; 
                            let result = await post('/course-search', { "userId": "65508cad9d5aad0ca635088f", "query": query });

                            setResults(result);
                        }
                    }}
                ></input>
                <div 
                    style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                    onClick={async () => {
                        let query = (document.getElementById("searchCourses")! as HTMLInputElement).value; 
                        let result = await post('/course-search', { "userId": "65508cad9d5aad0ca635088f", "query": query });

                        setResults(result);
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