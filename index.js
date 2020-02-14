const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const mongoose = require('mongoose');

// set up express app
const qbotapp = express();


// connect to mongodb
mongoose.connect('mongodb://qabotdb:ryd5jwE2bpnq4nzTafyV7zHwNqFwKsGet9EQjmZ5b8zvlfY59SlLX9BJO6aHfZi35paKR9mMIUzZc8e7V6YjIA%3D%3D@qabotdb.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false');
mongoose.Promise = global.Promise;

// so that we can serve static files
qbotapp.use(express.static('public'));

// intlialize body parser middleware
qbotapp.use(bodyParser.json());

// initialize routes to be used by app
qbotapp.use('/api',routes);

// initialize error-handling middleware
qbotapp.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});

// listen for requests
qbotapp.listen(process.env.PORT || 4000,function(){
  console.log('now listening for requests');
});
