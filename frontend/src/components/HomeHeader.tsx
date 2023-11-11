import React from 'react';
import './HomeHeader.css';
import AccountMenu from '../components/Profile';
import CourseDrawer from '../components/Drawer';

const courses = ["CS 220", "CS 230", "CS 240", "CS 250", "STATS 515"];

function HomeHeader() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectCourse = (index: number) => {
    setSelectedIndex(index);
  }

  return (
    <div className="home-header">
        <div className='corner'>
          <CourseDrawer select={selectCourse} courses={courses} />
        </div>
        <div className='course-name'>{courses[selectedIndex]}</div>
        <div className='corner'>

        </div>
        <AccountMenu />
    </div>
  );
}

export default HomeHeader;