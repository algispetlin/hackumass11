import React from 'react';
import './HomeHeader.css';
import AccountMenu from '../components/Profile';
import CourseDrawer from '../components/Drawer';
import { Course } from '../models/ApiModel';

import { CssBaseline, ThemeProvider } from "@mui/material";
import NightModeToggle from "../components/NightModeToggle";

const courses: Course[] = [
  { _id: "876543567", name: "CS220", instructor: { name: "Marius Minea", id: "223567544"} }, 
  { _id: "023654034", name: "CS230", instructor: { name: "Joe Chu", id: "367543766"} },
  { _id: "945400565", name: "CS240", instructor: { name: "Peter Haas", id: "436578746"} },
  { _id: "125634573", name: "CS250", instructor: { name: "David Barrington", id: "935667444"} },
  { _id: "094959756", name: "JOURN250", instructor: { name: "Steve Fox", id: "245647845"} },
  { _id: "709845805", name: "STATS515", instructor: { name: "Wei Zhu", id: "837249823"} } 
];

function HomeHeader() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectCourse = (index: number) => {
    setSelectedIndex(index);
  }

  return (
    <div className = "home-header">
        <div className='corner'>
          <CourseDrawer select={selectCourse} courses={courses} />
        </div>
        <div style={{ fontSize: 23, fontWeight: 650, color: "#D9D9D9" }}>{courses[selectedIndex].name}</div>
        <div className='corner'>
        <NightModeToggle />
        </div>
        <AccountMenu />
    </div>
  );
}

export default HomeHeader;