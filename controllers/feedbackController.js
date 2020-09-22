const catchAsynsc = require('./../utils/catchAsync');
const feedback = require('./../models/feedbackModel');
const Reply = require('./../models/feedbackModel');
const Reaction = require('./../models/feedbackModel');

exports.createFeedback = catchAsynsc(
    async (req, res, next) => {
        
        const newFeedback = await feedback.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newFeedback
        });
    }
);

//to get by id 
exports.getFeedback = catchAsynsc(
    async (req, res, next) => {
        console.log(req.query);
        
        const oldFeedback = await feedback.findById(req.query.id);
        console.log(oldFeedback);
        res.status(200).json({
            status: 'success',
            data: oldFeedback
            
        })
        
        // console.log(req.parmas.id);
    }
);

// to update feedback
exports.updateFeedback = catchAsynsc(
    async (req, res, next) => {
        const updatefeedback = await feedback.findByIdAndUpdate(
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
    
        const deletefeedback = await feedback.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: deletefeedback
        })
    }
);

// to create reply
exports.createReply = catchAsynsc(
    async (req,res, next) => { 
        
        const newFeedback = await feedback.findById(req.parmas.id);
        const newReply = await Reply.create(req.body);

        newFeedback.replies.push(newReply);
        res.status(200).json({
            status: 'success',
            data: oldFeedback
        })
    }
)

// to get reply
exports.getReply = catchAsynsc(
    async (req,res,next) => {
        const foundReply = await Reply.findById(req.params.id);

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
        const newFeedback = await feedback.findById(req.parmas.id);

        const newReaction = await Reaction.create(req.body);

        newFeedback.reactions.push(newReaction);
        res.status(200).json({
            status: 'success',
            data: newFeedback
        })
    }
)