const catchAsynsc = require('../utils/catchAsync');
const {Feedback, Reply, Reaction} = require('../models/feedbackModel');

exports.createFeedback = catchAsynsc(
    async (req, res, next) => {
        const newFeedback = await Feedback.create(req.body);
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
        const updatefeedback = await Feedback.findByIdAndUpdate(
            req.body.id,req.body,{
                new: true,
                runValidators: true
            }
        );
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