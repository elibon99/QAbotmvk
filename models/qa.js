const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');

const Schema = mongoose.Schema;

// Create qa Schema & model

const QaSchema = new Schema({
  question:{
    type: String,
    required: [true, 'Question is required']
  },
  answer:{
    type: String
  },
  open:{
    type: Boolean,
    default: false
  }
});

var esClient = new elasticsearch.Client({
  host: 'https://elastic:foQdH4R3B80l5TdM0cDqt1lE@8a3f4f748ed14d71b5226a29a9f48008.westeurope.azure.elastic-cloud.com:9243'
});

QaSchema.plugin(mongoosastic, {
  esClient: esClient
})


const QaModel = mongoose.model('qa', QaSchema);

/*
var newQa = new QaModel({
    question: 'Question',
    answer: 'Answer'
});

newQa.save((err) => {
    if(err) throw err;
    newQa.on('es-indexed', function(err, res){
        if (err) throw err;
    });
})
*/

module.exports = QaModel;
