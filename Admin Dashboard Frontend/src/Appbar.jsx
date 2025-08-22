import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';



function Appbar(){
    const [token, setToken] = useState(
        localStorage.getItem('token')
    )
    const [username, setUserName] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:3000/admin/me",{
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        }).then((resp) => {
            resp.json().then((data) => {
                setUserName(data.username);
                
                setisLoading(false);
                
            })
        })
        
        
    },[])
    if(isLoading) return <div></div>;
    
    if(username){
            return  <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        backgroundColor:"black",
                        padding:"4px"
                    }}>
        
                        <div><Typography variant="h3" style={{
                color:'#6495ED'
            }}>CourseMandi</Typography></div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Button variant='contained' onClick={()=>{
                            navigate('/addCourse');
                            
                        }} style={{margin:"10px"}} >AddCourse</Button>
                        <Button variant='contained' onClick={()=>{
                            navigate('/courses');
                            
                        }} style={{margin:"10px"}} >View Courses</Button>
                        <Button variant='contained' onClick={()=>{
                            localStorage.setItem('token',null);
                            window.location = '/';
                            
                        }} style={{margin:"10px"}} >Logout</Button>
                        <Avatar style={{background:"green"}}></Avatar>
                        
                        
                        </div>
                    </div>
    }else{
    
        return <div style={{
            display:"flex",
            justifyContent:"space-between",
            backgroundColor:"black",
            padding:"4px"
            }}>
            
                <div><Typography 
                        variant="h3" 
                        style={{
                            color:'#6495ED'
                        }}>CourseMandi
                        </Typography>
                </div>
                <div>
                    <Button
                    variant='contained' onClick={()=>{
                        navigate('/signup');
                    }}
                    style={{
                        margin:"10px"
                    }}>Signup
                    </Button>

                    <Button variant='contained' onClick={()=>{
                        navigate('/signin');
                    }} style={{margin:"10px"}}>Signin</Button>
                </div>

            

        </div>
    }
}

export default Appbar;