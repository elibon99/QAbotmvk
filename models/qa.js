const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

// Create qa Schema & model

const QaSchema = new Schema({
  question:{
    type: String,
    required: [true, 'Question is required']
  },
  answer:{
    type: String,
  }
});

QaSchema.plugin(mongoosastic, {
  hosts: [
    'localhost:9200'
  ]
});
 

const QaModel = mongoose.model('qa', QaSchema);

module.exports = QaModel;
