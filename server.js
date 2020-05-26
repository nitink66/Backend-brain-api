const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')
const formData = require('express-form-data');


const register = require ('./controllers/register')
const signin = require ('./controllers/signin')
const profile = require ('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: false,
    }
  });

const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use(formData.parse());


app.get('/',(req,res)=>{
    res.json('it is working');
})


app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt)})


app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=> {image.handleImage(req,res,db)})  

app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res)})

app.post("/image-upload", image.handleImageUpload());

app.listen(3000,()=>{
    console.log(`listening to port 3000`);
})
