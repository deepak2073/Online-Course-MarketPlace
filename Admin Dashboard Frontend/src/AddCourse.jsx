import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';    
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';



function AddCourse(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [published, setPublished] = useState('');
    const [imageLink, setImageLink] = useState('');
    
    const navigate = useNavigate();
    return <div style={{
        display:"flex",
        height:"100vh",
        width:"100vw",
        backgroundColor:"black",
        justifyContent:"center"
    }}>
        <div style={{
            
            background:"#eeeeee",
            padding:"40px",
            border:"2px solid transparent"
        }}>
            <h1 style={{textAlign:"center", color:"#888888", fontSize:"28px", margin:"0px 0px 28px" }}>Welcome to Add Course section</h1>
            <h3 style={{textAlign:"center", color:"#888888", fontSize:"21px", margin:"0px 0px 21px"}}>Add the details of the new course below</h3>
        
            <Card variant="outlines" style={{
                width:"420px",
            height:"469px" ,
                padding:"20px"
            }}>
            <TextField 
            fullWidth = {true}
            label="title" 
            variant="filled"
            type="text"
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            
            />
            <br />
            <TextField
             fullWidth = {true} 
             label = "description"
             type = "text" 
             variant="filled"
             onChange={(e) => {
                setDescription(e.target.value);
             }}
             
            /> <br />
            <TextField
             fullWidth = {true} 
             label = "price"
             type = "number" 
             variant="filled"
             onChange={(e) => {
                setPrice(e.target.value);
             }}
             
            /> <br />
            <TextField
             select 
             label="Published"
             fullWidth
             variant='filled'
             onChange={(e) => 
                setPublished(e.target.value)
             }>
                <MenuItem value="true" selected>Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
            </TextField>
            <br />
            <TextField
             fullWidth = {true} 
             label = "Image Link/url"
             type = "url" 
             variant="filled"
             onChange={(e) => {
                setImageLink(e.target.value);
             }}
             
            /> <br/>
            
             <Button 
              size={'large'} 
              variant="contained"
              onClick={()=>{
                fetch("http://localhost:3000/admin/courses",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json",
                        "Authorization":"Bearer " + localStorage.getItem('token')
                    },
                    body:JSON.stringify({title, description, price, published, imageLink})
                }).then((response) => {
                    response.json().then((data) => {
                        alert(data.message);
                        navigate('/courses')
                    })
                })
                
            
              }} 
             >Add Course</Button>
            </Card>
        </div>
    </div>;

}




export default AddCourse;