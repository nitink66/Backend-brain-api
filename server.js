const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')

const register = require ('./controllers/register')
const signin = require ('./controllers/signin')
const profile = require ('./controllers/profile')
const image = require('./controllers/image')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smart_brain'
    }
  });

const app = express();
app.use(bodyparser.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.json(database.users);
})


app.post('/signin',(req,res)=> {signin.handleSignin(req,res,db,bcrypt)})


app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=> {image.handleImage(req,res,db)})  

app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res)})  

app.listen(3000,()=>{
    console.log("listening to port 3000");
})
