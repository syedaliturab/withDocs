const mongoose = require('mongoose');
mongoose.Types.ObjectId.isValid('your id here');


const feedbackSchema = new mongoose.Schema({
    name : {
      type : String,
      required : true
    },
    doctorId:{
      type: String,
      requried: true
    },
    message: {
      type : String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    age: {
      type : Number
    },
    gender: {
      type: String,
      enum: {
          values: ['Male', 'Female','Other'],
          message: 'gender is either Male, Female or Other'
      }
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Reply'
      }
    ],
    reactions:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Reaction'
      }
    ],
    rating : [
      {
        type : Number,
        min : 0,
        max : 5
      }
    ]

})

const replySchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  doctorId:{
    type: String
  },
  message: {
    type : String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  age : {
    type : Number
  },
  gender: {
    type: String,
    enum: {
        values: ['Male', 'Female','Other'],
        message: 'gender is either Male, Female or Other'
    }
  },
  rating : [
    {
      type : Number,
      min : 0,
      max : 5
    }
  ]
});

const reactionSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  reaction : {
    type : String,
    required : true
  }
});

const Reaction = mongoose.model('Reaction', reactionSchema);
const Feedback = mongoose.model('feedback', feedbackSchema);
const Reply = mongoose.model('Reply', replySchema);

module.exports = { Feedback, Reply, Reaction };
