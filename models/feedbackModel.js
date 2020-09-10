const mongoose = require('mongoose');
const validator = require('validator');

const feedbackSchema = new mongoose.Schema({
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
    replies: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Reply' 
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
  replies: [
      {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Reply' 
      }
  ]
})

// feedbackSchema.virtual('likeCount', {
//     ref: 'Like',
//     localField: '_id',
//     foreignField: 'postId',
//     count: true
// });

// feedbackSchema.virtual('likes', {
//     ref: 'Like',
//     localField: '_id',
//     foreignField: 'postId',
// });


const feedback = mongoose.model('feedback', feedbackSchema);
const Reply = mongoose.model('Reply', replySchema);
module.exports = feedback;