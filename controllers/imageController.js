const images = require('./../models/imageModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to get Image by id and role
exports.getImage = catchAsynsc(
    async (req, res, next) => {

        const image = await images.findOne({
            id: req.params.id,
            role: req.params.role
        });
        res.status(200).json({
            status: 'success',
            data: image
            
        })
    }
);
//to create a Image
exports.uploadImage = catchAsynsc(
    async (req, res, next) => {
        const image = await images.findOne({
            id: req.body.id,
            role: req.body.role
        });
        if(!image){
            console.log("new")
            const newimage = await images.create(req.body);
            res.status(200).json({
                status: 'success',
                data: newimage
            }); 
        }else{
            console.log("Update")
            image.image = req.body.image;
            const newimage = await image.save();
            res.status(200).json({
                status: 'success',
                data: newimage
            }); 
        }
        
    }
);
