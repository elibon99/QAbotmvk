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
  }
});

var esClient = new elasticsearch.Client({host: 'https://elastic:OOCT69FlSgFnYBWnJIqQFwAc@deb18c8e4bcb4af9b37c740eb9f3d0f6.westeurope.azure.elastic-cloud.com:9243'});

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
