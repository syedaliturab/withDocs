const catchAsynsc = require('./../utils/catchAsync');
const feedback = require('./../models/feedbackModel');
const Reply = require('./../models/feedbackModel');

//createfeedback
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

        // const oldFeedback = await feedback.findById(req.params.id);
        // res.status(200).json({
        //     status: 'success',
        //     data: oldFeedback
            
        // })

        console.log(req.parmas.id);
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


exports.createReply = catchAsynsc(
    async (req,res, next) => { 
        
        const oldFeedback = await feedback.findById(req.params.id);
        const newReply = await Reply.create(req.body);

        oldFeedback.replies.push(newReply);
        console.log(newReply);
        res.status(200).json({
            status: 'success',
            data: newReply
        })
        
        // feedback.findById(req.params.id, function(err, oldFeedback){
        //     if(err){
        //         console.log(err);
        //         res.status(400).json({
        //             status : 'fail',
        //             data : err
        //         })
        //     }
        //     else{
        //         console.log(oldFeedback);
        //         res.status(200).json({
        //                 status: 'success',
        //                 data: oldFeedback
        //             })

        //     }
        // })
        
    }
)


