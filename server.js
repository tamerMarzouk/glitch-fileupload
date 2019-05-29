'use strict';

var express = require('express');
var cors = require('cors');
var multer=require('multer'); //for file upload request encoding

// require and use "multer"...

var app = express();

app.use(cors());
//prepare multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })
app.use('/public', express.static(process.cwd() + '/public'));

app.post("/api/fileanalyse",upload.single('upfile'),(req,res)=>{
  console.log(req.file)
  let result={name:req.file.originalname,type:req.file.mimetype,size:req.file.size}
  res.send(result);
});
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
