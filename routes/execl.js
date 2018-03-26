const express = require('express');
const router = express.Router();
var upload = require('express-fileupload');
router.use(upload()); // configure middleware
var xlsx = require('node-xlsx');
var fs = require('fs');
var Sync = require('sync');
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

// Connect
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
//         if (err) return console.log(err);

//         closure(db);
//     });
// };

// // Error handling
// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// };

// // Response handling
// let response = {
//     status: 200,
//     data: [],
//     message: null
// };

// Get users
router.get('/users', (req, res) => {
console.log("called");

res.json('arr');

});

router.post('/upload',function(req,res){
    console.log("sdjfalfhslakdjf",req.files);
    var arr=[];
    var obj;
    if(req.files.upfile){

      var file = req.files.upfile,
        name = file.name,
        type = file.mimetype;
      var uploadpath = __dirname + '../.././uploads/' + name;
      file.mv(uploadpath,function(err){
        if(err){
          console.log("File Upload Failed",name,err);
          res.send("Error Occured!")
        }
        else {
          function asyncFunction() {
            var dirname='./uploads/'
            fs.readdir(dirname, function(err, filenames) {
              if (err) {
                console.log("err",err);
              }
              console.log("gkjghgj",filenames)
              filenames.forEach(function(filename) {
                console.log("kandupuchen",filename)
                obj = xlsx.parse("./uploads/"+filename);
                
              });
            });
            // console.log("File Uploaded", xlsx.parse(req.files.upfile));
            // console.log("dirname",__dirname + '../.././uploads/myFile.xlsx')
            // var obj = xlsx.parse(__dirname + './uploads/myFile.xlsx'); 
             console.log("File Uploaded1",obj);// parses a file
            // //res.send('Done! Uploading files')
            return obj;
           
        }
          Sync(function(){
 
            try {
                var result = asyncFunction.sync();
                console.log(result);
            }
            catch (e) {
                console.error(e); // something went wrong 
            }
        })
     
         
        }
      });

      res.json(obj);

    }
    else {
      res.send("No File selected !");
      res.end();
    };
  })

module.exports = router;