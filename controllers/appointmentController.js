const appointments = require('./../models/appointmentModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to book appointment into clinic details
exports.bookAppointment = catchAsynsc(
    async (req, res, next) => {
        
        const updateClinic = await appointments.findById(
            req.params.id,
        );
        var appointment = updateClinic[req.body.clinic].appointment;
        if(appointment.length==0){
            if(req.body.slot=="morningSlots"){
                appointment.push({
                    date: req.body.date,
                    morningSlots: [req.body.patient],
                });
            }else if(req.body.slot=="afternoonSlots"){
                appointment.push({
                    date: req.body.date,
                    afternoonSlots: [req.body.patient],
                });
            }else if(req.body.slot=="eveningSlots"){
                appointment.push({
                    date: req.body.date,
                    eveningSlots: [req.body.patient],
                });
            }else{
                appointment.push({
                    date: req.body.date,
                    onlineSlots: [req.body.patient],
                });
            }
        }else{
            appointment.forEach(element => {
                console.log(element);
            });
            
        }
        console.log(updateClinic);
        updateClinic[req.body.clinic].appointment = appointment;
        await updateClinic.save();
        res.status(200).json({
            status: 'success',
            data: updateClinic
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