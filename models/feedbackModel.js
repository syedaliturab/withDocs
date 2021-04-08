const mongoose = require('mongoose');
mongoose.Types.ObjectId.isValid('your id here');


const feedbackSchema = new mongoose.Schema({
    patientId:{
      type: String,
      requried: true
    },
    doctorId:{
      type: String,
      requried: true
    },
    appointmentId:{
      type: String,
      requried: true
    },
    patientName : {
      type : String,
      required : true
    },
    sexAndAge: {
      type : String,
      required : true
    },
    rating: {
      type: Number,
      min : 1,
      max : 5
    },
    message: {
      type : String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    waitingTime : {
      type : String
    },
    recommend :{
      type : Boolean
    },
    purpose: {
      type : [String]
    },
    satisfaction : {
      positive : {
        type :[String]
      },
      negative : {
        type : [String]
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
    ]

})

const replySchema = new mongoose.Schema({
  doctorId:{
    type: String
  },
  doctorName : {
    type : String,
    required : true
  },
  message: {
    type : String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const reactionSchema = new mongoose.Schema({
  doctorName : {
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
