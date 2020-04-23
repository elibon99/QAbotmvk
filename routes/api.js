const express = require('express');
const router = express.Router();
const QaModel = require('../models/qa.js');


QaModel.createMapping(function(err, mapping){
  if (err){
    console.log('error creating mapping');
    console.log(err);
  } else{
    console.log('Mapping created');
    console.log(mapping);
  }
});

var stream = QaModel.synchronize();
var count = 0;

stream.on('data', function() {
  count++;
});

stream.on('close', function() {
  console.log("Indexed " + count + " documents");
});

stream.on('error', function() {
  console.log(err);
});

/*
router.get('/search', function(req, res) {
  QaModel.search({query_string: {query: "Question"}}, function(err, results) {
    res.send(results);
  });
});
*/

 /*
router.get('/search', function(req, res) {
    QaModel.search({
        query: {
            multi_match: {
                query: req.body.q,
                fields: [
                    question,
                    answer
                ],
                fuzziness: 1
            }
        }
    }, function(err, results) {
        res.send(results);
    });
});

*/

router.get('/search', function (req, res, next) {
    console.log("keyword: " + req.query.q);
    QaModel.search({
        multi_match: {
          query: req.query.q,
          fields: [
              "question",
              "answer"
          ],
          fuzziness: 1
        }
    }, function (err, results) {
        if (err) return next(err);
        var data = results.hits.hits.map(function(hit) {
            return hit._source;
        });
        res.send(data);
    });
});

//question: req.query.q
// get list of answers from db
router.get('/qa', function(req, res, next) {
    QaModel.find({question: req.query.q}).then(function(qa){
        console.log(qa);
        res.send(qa);
    });
});

// add new question to db
router.post('/qa', function(req, res, next) {
  QaModel.create(req.body).then(function(qa){
    res.send(qa);
  }).catch(next);
});


module.exports = router;
