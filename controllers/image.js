const Clarifai = require ('clarifai')

const app = new Clarifai.App({
    apiKey: '499b6ce27908494eb409769cba86505d'  // API KEY is changed here
   });

   const handleApiCall = (req,res)=>{
   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data =>{
       res.json(data);
   })
   .catch(err =>response.status(400).json("UNABLE TO HANDLE API "))
}

const handleImage = (req,res,db)=>{
    const { id } =req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('UNABLE to get entries'))
}

module.exports ={ 
    handleImage,
    handleApiCall
}