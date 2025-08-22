import { Card, Typography } from "@mui/material";
import utility from './assets/utility.jpg'
import { useState } from "react";

const  CourseCard = (props) => {
    console.log("hello from the course card component")
    return (
    <div style={{
        display:"flex",
        justifyContent:"space-between",
        margin:"20px",
    }}>
        <Card variant="outlines" style={{
                height:"469px",
                padding:"20px",
                backgroundColor:"#eeeeee"}}>
        <Typography >Course Name: {props.course.title}</Typography>
        <Typography >Description: {props.course.description}</Typography>
        <Typography>Price: {props.course.price}</Typography>
        <Typography>Course Published:{(props.course.published)?" Yes":" No"}</Typography>
        <img src={utility} width="300px" height = "200px" alt="" /><br /><br />
        {/* <Button variant="contained" onClick={() =>{
            navigate(`/editCourse/${id}`,{state:{course}});
        }}>Edit Course</Button> */}

        

    </Card>   
    </div>
    )
};
export default CourseCard;