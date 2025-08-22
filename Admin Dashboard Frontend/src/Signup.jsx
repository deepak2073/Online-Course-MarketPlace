import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';



function Signup(){
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    
    return <div style={{
        display:"flex",
        height:"100vh",
        width:"100vw",
        backgroundColor:"black",
        justifyContent:"center"
    }}>
        <div style={{
            
            background:"black",
            padding:"40px",
            border:"2px solid transparent"
        }}>
            <h1 style={{textAlign:"center", color:"#888888", fontSize:"28px", margin:"0px 0px 28px" }}>Welcome to CourseMandi</h1>
            <h3 style={{textAlign:"center", color:"#888888", fontSize:"21px", margin:"0px 0px 21px"}}>Sign up below!</h3>
        
            <Card variant="outlines" style={{
                width:"420px",
                height:"469px" ,
                padding:"20px",
                backgroundColor:"#eeeeee"

            }}>
            <TextField 
            fullWidth = {true}
            id="filled-basic" 
            label="mail" 
            variant="filled"
            type="text"
            onChange={(e) => {
                setUsername(e.target.value);
            }}
            />
            <br /> <br />
            <TextField
             fullWidth = {true} 
             id="outlined-basic"
             label = "password"
             type = "password" 
             variant="filled"
             onChange={(e) => {
                setPassword(e.target.value);
             }}
            
            />
            <br /> <br />
             <Button
               size={'large'} 
               variant="contained"
               onClick={()=>{
                
                
                fetch("http://localhost:3000/admin/signup",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify({
                        username,
                        password
                    })
                    
                }).then((response) => {
                    response.json().then((data) => {
                        localStorage.setItem('token',data.token);
                        document.location = '/';
                    })
                })
            
              }} 
             >Signup</Button>
            </Card>
        </div>
    </div>

}

export default Signup;