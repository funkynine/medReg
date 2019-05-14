var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:80981256151q@cluster0-rncdd.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'myApp' });
});

router.get('/login', (req, res, next)=>{

  client.connect(err => {
    if(err){console.log("Error: ", err)
    }else{
      const collection = client.db("test").collection("myCollection");
      // perform actions on the collection object
      console.log("Database connect");
      res.send("database connect");
      client.close();
    };
  });
  
});

router.post('/login', (req, res, next)=>{
  
});

router.get('/registration', (req, res, next)=>{
  res.render('registration');
});

router.post('/registration', (req, res, next)=>{
  // TODO
});

router.get('/reset', (req, res, next)=>{
  res.render('reset');
});

router.post('/reset', (req, res, next)=>{
  // TODO
});



module.exports = router;
