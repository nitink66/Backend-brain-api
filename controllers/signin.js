const handleSignin=(req,res,db,bcrypt)=>{
    const { email , password } = req.body;
    if(!email ||  !password){
        return res.status(400).json('incorrect credentials');
      }
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data => {
       const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
       if(isValid){
           return db.select('*').from('users')
           .where('email','=',req.body.email)
           .then(user =>{
               res.json(user[0])
           })
           .catch(err => res.status(400).json('UNABLE TO GET USER'))
       }
       else{
           res.status(400).json('WRONG credentials')
       }
    })
     .catch(err => res.status(400).json('WRONG CREDENTIALS'))
 }

 module.exports ={
     handleSignin : handleSignin
 }