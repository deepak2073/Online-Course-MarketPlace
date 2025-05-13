const express = require('express');
const app = express();


app.use(express.json());


let ADMINS = [];
let USERS = [];
let COURSES = [];

function adminAuthentication(req,res,next){
  const {username, password} = req.body;
  if(!username || !password) res.status(400).json({message:"Bad Request, please fill all fields."})
  let user = ADMINS.find(u=> u.username === username && u.password === password);
  if(user) next();
  else res.status(401).json({message:"Admin authentication failed!!"});
}

function userAuthentication(req,res,next){
  const {username, password} = req.body;
  let user = USERS.find(u=> u.username === username && u.password === password);
  if(user){
    req.user = user;
    next();
  }else{
    res.status(401).json({message:"User authentication failed"});
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const {username, password} = req.body;
  const admin = ADMINS.find(a=> a.username === username && a.password === password);
  if(admin) res.status(401).json({message:"Admin already exists, please sign in."});

  ADMINS.push({username,password});
  res.status('200').json({message:"Admin created successfully"});
  // logic to sign up admin
});

app.post('/admin/login',adminAuthentication, (req, res) => {
  res.status('200').json({message:"Admin signed in successfully"});
  // logic to log in admin
});


app.post('/admin/courses',adminAuthentication, (req, res) => {
  const{username, password, ...courseData} = req.body;
  if(!courseData.title || !courseData.description || !courseData.price || !courseData.published) res.status(403).json({message:"Please enter all fields of the course!!"});
  const {title, description, price, published} = courseData;
  let newCourse = {id:Date.now(),...courseData};
  COURSES.push(newCourse);
  res.status('200').json({message:`Course registered successfully, Course Id: ${newCourse.id}`});
  // logic to create a course
});

app.put('/admin/courses/:id', adminAuthentication,(req, res) => {
  let id = req.params.id;
  let course = COURSES.find( id=> id = course.id);
  if(course){
    Object.assign(course,req.body);
    res.json({message:"Course updated successfully"});
  }else{
    res.json({message:"course not found."});
  }
  // logic to edit a course
});

app.get('/admin/courses',adminAuthentication, (req, res) => {
  res.status('200').json(COURSES);
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  const {username, password} = req.body;
  let user = USERS.find(u=> u.username === username && u.password === password);
  if(user) res.status(401).json({message:"User already exists, please signin"});
  const newuser = {...req.body, purchasedCourses: []};
  USERS.push(newuser);
  res.status(200).json({message:"User signup successful"/*,jwt_token_here */});
  // logic to sign up user
});

app.post('/users/login',userAuthentication, (req, res) => {
  res.status('200').json({message:"user signed in successfully",token:'jwt_token_here'});
});

app.get('/users/courses',userAuthentication, (req, res) => {
  res.status(200).json({courses: COURSES.filter(c=> c.published.toLowerCase() == "yes" )});
   
  // logic to list all courses
});

app.post('/users/courses/:courseId',userAuthentication, (req, res) => {
  const cid = Number(req.params.courseId);
  const {username, password} = req.body;
  let course = COURSES.find(c=> Number(c.id) === cid && c.published.toLowerCase() === "yes");
  if(course){
    req.user.purchasedCourses.push(course);
    res.status(200).json({message:"Course purchased successfully!!"});
  }
  res.status(404).json({message: "Course not found or not available"});
  
  // logic to purchase a course
});

app.get('/users/purchasedCourses',userAuthentication, (req, res) => {
  const {username, password} = req.body;
  let user = USERS.find(u=> u.username === username && u.password === password);
  res.status(200).json({Purchased_Courses: user.purchasedCourses});
  // logic to view purchased courses
});

app.listen(3000,userAuthentication, () => {
  console.log('Server is listening on port 3000');
});
