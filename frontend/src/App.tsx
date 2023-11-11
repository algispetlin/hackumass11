import React from 'react';
import Router from './Router';
import './App.css';
import { RouterProvider } from 'react-router-dom';

function App() {
  // fetch('http://localhost:5000/ask-question', {
  //   method: "POST",
  //   body: JSON.stringify({ "courseId": "CS220", "question": "What is an A in this class?" })
  // }).then((response) => {
  //   console.log(response);
  // }).catch()

  fetch('http://localhost:5000/ask-question', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "courseId": "CS220", "question": "What is an A in this class?" })
  }).then(response => response.json().then(data => console.log(data)), () => console.log("Error"))

  return (
    <RouterProvider router={Router} />
  );
}

export default App;
