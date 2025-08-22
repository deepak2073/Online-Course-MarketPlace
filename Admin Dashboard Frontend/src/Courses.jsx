import { useState, useEffect } from "react";
import {CardMedia, TextField, Typography} from "@mui/material";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import utility from './assets/utility.jpg'


function Courses(){
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses",{
            method:"GET",
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            response.json().then((data) => {
                setCourses(data.courses);
                
                
            })
        })
        
    },[])

    return <div style={{
        display:"flex",
        flexWrap:"wrap",
        width:"100%",
        height:"100%"
    }}>
        {
            courses.map(c => {
                return <Button onClick={()=>{
                        navigate(`/course/${c._id}`);
                    }}><Card style={{
                        margin:10,
                        width:300,
                        height:200,
                        overflow:"hidden"
                }}>
                    <Typography textAlign="center"  variant="h5">{c.title}</Typography>
                    <Typography textAlign="center"  >{c.description}</Typography>
                    <img src={utility} width="300px" height = "180px" alt="" />
                </Card></Button>
            })
        }
    </div>
    

    

}



export default Courses;