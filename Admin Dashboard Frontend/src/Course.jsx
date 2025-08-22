import { Card, Typography,TextField, MenuItem } from "@mui/material";
import React, { useState } from "react";

import { useEffect } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import {Button} from "@mui/material";
import EditCourse from './EditCourse';
import CourseCard from './CourseCard';
import utility from './assets/utility.jpg'


const Course = () => {
    console.log("hello from the course component")
    let { id } = useParams(); 
    const [course, setCourse] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/admin/course/${id}`,{
            method:"GET",
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
            }).then((response) => {
                response.json().then((data) => {
                    setCourse(data.course[0]);
                
                  
                   
                    
                    
                })
            })
            
        },[])
        if(!course) return <p>Loading  Course...</p>
        console.log(course._id)

        return <>
        <CourseCard course = {course}/>
        <EditCourse course = {course} setCourse = {setCourse}/>
        </>

}






export default Course;