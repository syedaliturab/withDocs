const catchAsynsc = require('../utils/catchAsync');
const docUser = require("../models/doctorModel");
const clinic = require("../models/clinicModel")
const {Feedback, Reply, Reaction} = require('../models/feedbackModel');
const { compare } = require('bcryptjs');

exports.createFeedback = catchAsynsc(
    async (req, res, next) => {
        var result = []
        const newFeedback = await Feedback.create(req.body);
        const doctorInfo = await docUser.find({ _id : newFeedback.doctorId});
        const clinicInfo = await clinic.find({_id : newFeedback.doctorId});
        clinicInfo[0].clinicOne.clinicIssues.forEach(foundInfo => {
            req.body.purpose.forEach(foundPurpose => {
                if(foundInfo.name == foundPurpose){
                    if(foundPurpose.totalCount == NaN){
                        foundInfo.totalCount = 0
                    }
                    foundInfo.totalCount += 1;
                }
            })
        });
        clinicInfo[0].clinicOne.clinicServices.forEach(foundInfo => {
            req.body.purpose.forEach(foundPurpose => {
                if(foundInfo.name == foundPurpose){
                    foundInfo.totalCount += 1;
                    
                }
            })
        });
        clinicInfo[0].clinicTwo.clinicIssues.forEach(foundInfo => {
            req.body.purpose.forEach(foundPurpose => {
                if(foundInfo.name == foundPurpose){
                    if(foundPurpose.totalCount == NaN){
                        foundInfo.totalCount = 0
                        foundInfo.totalCount.markModified();
                    }
                    foundInfo.totalCount += 1;
                }
            })
        });
        clinicInfo[0].clinicTwo.clinicServices.forEach(foundInfo => {
            req.body.purpose.forEach(foundPurpose => {
                if(foundInfo.name == foundPurpose){
                    foundInfo.totalCount += 1;
                    
                }
            })
        });
        console.log(clinicInfo[0].clinicOne)
        console.log(clinicInfo[0].clinicTwo)
        
        doctorInfo[0].feedbackCount += 1
        doctorInfo[0].avgRating = ((doctorInfo[0].avgRating*(doctorInfo[0].feedbackCount-1)) + newFeedback.rating)/doctorInfo[0].feedbackCount 
        doctorInfo[0].avgRating = doctorInfo[0].avgRating.toFixed(1)
        await doctorInfo[0].save();
        await clinicInfo[0].save();  
        res.status(200).json({
            status: 'success',
            data: newFeedback
        });
    }
);

//to get by id 
exports.getFeedback = catchAsynsc(
    async (req, res, next) => {
      
        const Feedbacks = await Feedback.find({doctorId: req.query.id});
        res.status(200).json({
            status: 'success',
            data: Feedbacks
            
        })
    }
);

// to update feedback
exports.updateFeedback = catchAsynsc(
    async (req, res, next) => {
        var result = []
        const updatefeedback = await Feedback.findByIdAndUpdate(
            req.query.id,req.body,{
                new: true,
                runValidators: true
            }
        );
        const doctorInfo = await docUser.find({ _id : updatefeedback.doctorId});
        
        doctorInfo[0].avgRating = ((doctorInfo[0].avgRating*(doctorInfo[0].feedbackCount-1)) + updatefeedback.rating)/doctorInfo[0].feedbackCount
        doctorInfo[0].save();
        res.status(200).json({
            status: 'success',
            data: updatefeedback
        });
    }
);

//to delete feedback
exports.deleteFeedback = catchAsynsc( 
    async (req, res, next) => {
        console.log(req.params);
        const deletefeedback = await Feedback.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: deletefeedback
        })
    }
);

// to create reply
exports.createReply = catchAsynsc(
    async (req,res, next) => { 
        
        const newFeedback = await Feedback.findById(req.body.id);
        const newReply = await Reply.create(req.body);

        newFeedback.replies.push(newReply);
        await newFeedback.save();
        res.status(200).json({
            status: 'success',
            data: newReply
        })
    }
)

// to get reply
exports.getReply = catchAsynsc(
    async (req,res,next) => {
     
        const foundReply = await Reply.findById(req.query.id);

        res.status(200).json({
            status : 'success',
            data : foundReply
        })
    }
)

// to delete reply
exports.deleteReply = catchAsynsc(
    async (req, res, next) => {
        const deletereply = await Reply.findByIdAndRemove(req.parmas.id);

        res.status(200).json({
            status : 'success',
            data : deletereply
        })
    }
)

// to update reply
exports.updateReply = catchAsynsc(
    async(req, res, next) => {
        const updatereply = await Reply.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            status : 'success',
            data : updatereply
        })
    }
)

exports.postReaction = catchAsynsc(
    async(req, res, next) => {
       
        const newFeedback = await Feedback.findById(req.body.id);
        const newReaction = await Reaction.create(req.body);
        newFeedback.reactions.push(newReaction);
        await newFeedback.save();
        res.status(200).json({
            status: 'success',
            data: newReaction
        })
    }
)