const Clarifai = require ('clarifai')

const app = new Clarifai.App({
    apiKey: '499b6ce27908494eb409769cba86505d'  // API KEY is changed here
   });

   var multer = require('multer');
   var storage = multer.diskStorage({
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
  });

  var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

const cloudinary = require("cloudinary");
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
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



const handleImageUpload = () => (req, res) => {
	console.log(req.files);
	const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));
  
  Promise
    .all(promises)
    .then(results => res.json(results));
}

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports ={ 
    handleImage,
    handleApiCall,
    handleImageUpload
}