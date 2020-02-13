const express = require('express');
const router = express.Router();
const QaModel = require('../models/qa.js');


//question: req.query.qs
// get list of answers from db
router.get('/qa', function(req, res, next){
  // QaModel.find({}).then(function(qa){
  //   res.send(qa);
  // })
  res.send({type: 'GET'});
});

// add new question to db
router.post('/qa', function(req, res, next){
  QaModel.create(req.body).then(function(qa){
    res.send(qa);
  }).catch(next);

});


module.exports = router;
