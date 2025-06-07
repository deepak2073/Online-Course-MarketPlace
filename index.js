
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); 



const userSecret = "usersupers3cr3t1";
const adminSecret = "adminsupers3cr3t1";
app.use(express.json());

//Define mongoose schema

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses : [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

<<<<<<< HEAD
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
=======
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
>>>>>>> f85cf27 (Added JWT authentication and MongoDB connectivity)
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  published: Boolean
});

//Define mongoose models
const Admin = new mongoose.model('Admin', adminSchema);
const User = new mongoose.model('User', userSchema);
const Course = new mongoose.model('Course', courseSchema);


const generateJwtAdmin = (user) =>{
  const payload = {username: user.username};
  return jwt.sign(payload, adminSecret, {expiresIn: '1h'});

};
const generateJwtUser = (user) =>{
  const payload = {username: user.username};
  return jwt.sign(payload, userSecret, {expiresIn: '1h'});

};
const  authenticatejwtAdmin = (req,res,next) => {
  let authHeader = req.headers.authorization;
  if(authHeader){
    let token = authHeader.split(' ')[1];
    jwt.verify(token, adminSecret, (err, user) => {
      if(err){
        return res.status(403).json({message:"Admin authentication failed!!"});
        
      }else{
        req.user = user;
        next();
      }
    });
  }else{
    res.status(401);
  }
};
const  authenticatejwtUser = (req,res,next) => {
  let authHeader = req.headers.authorization;
  if(authHeader){
    let token = authHeader.split(' ')[1];
    jwt.verify(token, userSecret, (err, user) => {
      if(err){
        return res.status(403).json({message:"User authentication failed!!"});
      }else{
        req.user = user;
        next();
      }
    });
  }else{
    res.status(401);
  }  
};

mongoose.connect("mongodb+srv://deepak22scse1012073:mongo1234@cluster0.2m85yin.mongodb.net/courses",{ useUnifiedTopology:true,  useNewUrlParser: true, dbName: "courses"});


// Admin routes

//logic to signup admin
app.post('/admin/signup', async (req,res)=>{
  const {username, password} = req.body;
  const admin = await Admin.findOne({username, password});
  if(admin){
    return res.status(401).json({message: "Admin already exists, please login!!"});
  }
  const newAdmin = new Admin({username,password});
  await newAdmin.save();
  const token = generateJwtAdmin(newAdmin);
  res.status(200).json({message: "Admin sign up successful!!", token});
    
  

});

app.post('/admin/login', async (req, res) => {
  const {username, password} = req.body;
  const admin = await Admin.findOne({username,password});
  if(admin){
    let token = generateJwtAdmin(admin);
    res.status('200').json({message:"Admin signed in successfully", token});
  }
  else res.status(403).json({message:"Authentication failed!!"});

  
  // logic to log in admin
});


<<<<<<< HEAD
app.post('/admin/courses',adminAuthentication, (req, res) => {
  const{username, password, ...courseData} = req.body;
  if(!courseData.title || !courseData.description || !courseData.price || !courseData.published) res.status(403).json({message:"Please enter all fields of the course!!"});
  const {title, description, price, published} = courseData;
  let newCourse = {id:Date.now(),...courseData};
  COURSES.push(newCourse);
  res.status('200').json({message:`Course registered successfully, Course Id: ${newCourse.id}`});
=======
app.post('/admin/courses',authenticatejwtAdmin, async (req, res) => {
  const {title, description, price, published} = req.body;
  if(title == null || description == null || price == null || published == null){ res.status(403).json({message:"Please enter all fields of the course!!"});
  }else{
    let newCourse = new Course({title, description, price, published});
    await newCourse.save();
    res.status('200').json({message:`Course registered successfully, Course Id: ${newCourse.id}`});
  }
>>>>>>> f85cf27 (Added JWT authentication and MongoDB connectivity)
  // logic to create a course
});

app.put('/admin/courses/:id', authenticatejwtAdmin, async (req, res) => {
  
  let course = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if(course){
    res.json({message:"Course updated successfully"});
  }else{
    res.json({message:"course not found."});
  }
  // logic to edit a course
});

app.get('/admin/courses',authenticatejwtAdmin, async (req, res) => {
  const courses = await Course.find({});
  res.status('200').json({courses});
  // logic to get all courses
});


// User routes


app.post('/users/signup',  async (req, res) => {
  const {username, password} = req.body;
<<<<<<< HEAD
  let user = USERS.find(u=> u.username === username && u.password === password);
  if(user) res.status(401).json({message:"User already exists, please signin"});
  const newuser = {...req.body, purchasedCourses: []};
  USERS.push(newuser);
  res.status(200).json({message:"User signup successful"/*,jwt_token_here */});
=======
  let user = await User.findOne({username, password});
  if(user) {
    res.status(401).json({message:"User already exists, please sign in"});
  }else {
    const newuser = new User({username,password,purchasedCourses: []});
    await newuser.save();
    
    let token = generateJwtUser(newuser);
    res.status(200).json({message:"User signup successful", token});
  }
>>>>>>> f85cf27 (Added JWT authentication and MongoDB connectivity)
  // logic to sign up user
});

app.post('/users/login', async (req, res) => {
  const {username, password} = req.body;
  let user = await User.findOne({username,password});
  if(user) {
    let token = generateJwtUser(user);
    res.status(401).json({message:"User signed in successfully", token});
  }else{
    res.status(403).json({message:" Authentication failed!!"});
  }
  
});

<<<<<<< HEAD
app.get('/users/courses',userAuthentication, (req, res) => {
  res.status(200).json({courses: COURSES.filter(c=> c.published.toLowerCase() == "yes" )});
=======
app.get('/users/courses',authenticatejwtUser, async (req, res) => {
  let allCourses = await Course.find({published:'yes'});
  res.status(200).json({courses: allCourses });
>>>>>>> f85cf27 (Added JWT authentication and MongoDB connectivity)
   
  // logic to list all courses
});

<<<<<<< HEAD
app.post('/users/courses/:courseId',userAuthentication, (req, res) => {
  const cid = Number(req.params.courseId);
  const {username, password} = req.body;
  let course = COURSES.find(c=> Number(c.id) === cid && c.published.toLowerCase() === "yes");
  if(course){
    req.user.purchasedCourses.push(course);
=======
app.post('/users/courses/:courseId',authenticatejwtUser, async (req, res) => {
  const cid = req.params.courseId;
  let course = await Course.findById(cid);
  let user = await User.findOne({username: req.user.username});
  if(course && user){
    await user.purchasedCourses.push(course._id);
    await user.save();
>>>>>>> f85cf27 (Added JWT authentication and MongoDB connectivity)
    res.status(200).json({message:"Course purchased successfully!!"});
  }
  else res.status(404).json({message: "Course not found or not available"});
  
  // logic to purchase a course
});

app.get('/users/purchasedCourses',authenticatejwtUser, async (req, res) => {
  const {username} = req.user;
  let user = await User.findOne({username});
  await user.populate('purchasedCourses');

  res.status(200).json({Purchased_Courses: user.purchasedCourses});
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
