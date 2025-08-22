import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import {Button} from "@mui/material";

function Course() {
    
    let { id } = useParams(); 
    const [course, setCourse] = useState();
        
    useEffect(() => {
        fetch(`http://localhost:3000/users/courses/${id}`,{
            method:"GET",
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
            }).then((response) => {
                response.json().then((data) => {
                    setCourse(data.course[0]);
                    console.log(course);
                    alert("Purchased course succesfully");
                    
                    
                })
            })
            
        },[])
        
    if(!course) return <p>Loading  Course...</p>

    return <Card variant="outlines" style={{
                
                height:"469px",
                padding:"20px",
                backgroundColor:"#eeeeee"}}>
        <Typography variant="h4">Course Name: {course.title}</Typography>
        <Typography >Description: {course.description}</Typography>
        <Typography>Course Price: ₹{course.price}</Typography>
        <Typography>Course Published:{(course.published)?" Yes":" No"}</Typography>
        <img src={course.imageLink} width="300px" height = "200px" alt="" /><br /><br />
        

    </Card>;



    

}

export default Course;