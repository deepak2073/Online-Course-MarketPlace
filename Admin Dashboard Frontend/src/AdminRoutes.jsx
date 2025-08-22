import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Signup from './Signup.jsx';
import Signin from './Signin.jsx'; 
import Appbar from './Appbar.jsx';
import AddCourse from './AddCourse.jsx';
import Courses from './Courses.jsx';
import Course from './Course.jsx';
import EditCourse from './EditCourse.jsx';
import './App.css';
import { RecoilRoot } from 'recoil';


function App(){
  return (
    <div style={{background:"black"}}>
    <RecoilRoot>
    
    <Router>
      <Appbar/>
      <Routes>
          <Route path = "/addCourse" element={<AddCourse/>}/>
          <Route path = "/course/:id" element={<Course/>}/>
          <Route path ="/editCourse/:id" element={<EditCourse/>}/>
          <Route path = "/courses" element = {<Courses/>}/>
          <Route path ="/signin" element = {<Signin/>}/>
          <Route path="/signup" element = {<Signup/>}/>  
      </Routes>
    </Router>
    </RecoilRoot>
    </div>
  );
}

export default App
