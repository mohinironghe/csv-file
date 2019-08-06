var express = require('express');
var app = express();
var port = 3000;
const bodyParser = require('body-parser');
var fileSchema = require('../csvfile/fileschema');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/importcsv');
const cors = require('cors');

app.get('/',(req,res)=>{
    res.send('server started');
})
app.use(cors({ origin: 'http://localhost:4200' }));
// 5) put bodyparser code before the routes (converts request to req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post('/data', function(req,res){
      req.body.forEach(data => {
          
          var csvuserdata = new fileSchema({
            id:data.id,
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            gender:data.gender,
            id_address:data.id_address
         }) 
         return new Promise((resolve,reject)=>{
            csvuserdata.save(function(err){
                if(err){
                    console.log(err,data);
                    reject(err);
                }
                else{
                   resolve(data);
                }
            })
         })
     
      });
      console.log('data inserted');
 
      res.status(200).send({message:'data inserted'});
  });
  app.get('/getjsondata', function(req,res){
    fileSchema.find({},function(err,result){
        if (err){
            console.log(err);
        }else{
            // console.log(result);
            res.send(result);
        }
    })
  })
  

app.listen(port,()=> console.log(`server started on  port ${port}`))