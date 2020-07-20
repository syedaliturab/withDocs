const appointments = require('./../models/appointmentModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to book appointment into clinic details
exports.bookAppointment = catchAsynsc(
    async (req, res, next) => {
        const newappointment = await appointments.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newappointment
        });
    
    }
);

//to cancel appointment into clinic details
exports.cancelAppointment = catchAsynsc(
    async (req, res, next) => {
        
        const updateClinic = await appointments.updateOne(
            {id:req.params.id},
            req.body,{
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            data: updateClinic
        });
    }
);