import { useState } from "react";
import { Card, TextField, MenuItem, Button } from "@mui/material";


function EditCourse(props){
    
    console.log("hello from the edit course component")
    const [id,setId] = useState(props.course._id);
    const [title, setTitle] = useState(props.course.title);
    const [description, setDescription] = useState(props.course.description);
    const [price, setPrice] = useState(props.course.price);
    const [published, setPublished] = useState(props.course.published);
    const [imageLink, setImageLink] = useState(props.course.imageLink);

    
    
    return <div style={{
        display:"flex",
        minHeight:"100vh",
        backgroundColor:"black",
        justifyContent:"center",
        padding: "20px", 
        boxSizing: "border-box"
    }}>
        <div style={{
            
            background:"#eeeeee",
            padding:"40px",
            border:"2px solid transparent"
        }}>
            <h1 style={{textAlign:"center", color:"#888888", fontSize:"28px", margin:"0px 0px 28px" }}>Welcome to Edit Course section</h1>
            <h3 style={{textAlign:"center", color:"#888888", fontSize:"21px", margin:"0px 0px 21px"}}>Add the new details of the course below</h3>
        
            <Card variant="outlines" style={{
                width: "420px",
                minHeight: "90vh",
                overflowY: "auto",
                padding: "20px",
                marginBottom:"14px"
            }}>
            <TextField 
                value = {title}
                fullWidth = {true}
                label="Title" 
                variant="filled"
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            
            />
            <br />
            <TextField
                value = {description}
                fullWidth = {true} 
                label = "Description"
                type = "text" 
                variant="filled"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
             
            /> <br />
            <TextField
                value = {price}
                fullWidth = {true} 
                label = "Price"
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
                value={published} 
                onChange={(e) => setPublished(e.target.value)}
                >
                    <MenuItem value="true" selected>Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
            </TextField>
            <br />
            <TextField
                value={imageLink}
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
                fetch(`http://localhost:3000/admin/courses/${id}`,{
                    method:"PUT",
                    headers:{
                        "Content-type":"application/json",
                        "Authorization":"Bearer " + localStorage.getItem('token')
                    },
                    body:JSON.stringify({title, description, price, published, imageLink})
                }).then((response) => {
                    response.json().then(() => {
                        props.setCourse({title, description, price, published, imageLink});
                    })
                })
                
            
              }} 
             >Finalize Course Edit</Button>
            </Card>
        </div>
    </div>;

}

export default EditCourse