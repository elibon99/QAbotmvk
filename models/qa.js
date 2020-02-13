const mongoose = require('mongoose');
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

const QaModel = mongoose.model('qa', QaSchema);

module.exports = QaModel;
