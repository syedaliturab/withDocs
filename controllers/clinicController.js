const clinics = require('./../models/clinicModel.js');
const catchAsynsc = require('./../utils/catchAsync');
const { collection } = require('./../models/clinicModel.js');

//to get clinics
exports.getAllClinicProfile = catchAsynsc(
    async (req, res, next) => {

        const allClinics = await clinics.find();
        res.status(200).json({
            status: 'success',
            data: allClinics
            
        });
    }
);

//to get clinic by id
exports.getClinic = catchAsynsc(
    async (req, res, next) => {

        const clinic = await clinics.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: clinic
            
        })
    }
);
//to create clinic profile
exports.createClinicProfile = catchAsynsc(
    async (req, res, next) => {
        const newClinic = await clinics.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newClinic
        });
    }
);

//to update clinic details
exports.updateClinicDetail = catchAsynsc(
    async (req, res, next) => {
        
        const updateClinic = await clinics.findByIdAndUpdate(
            req.params.id,
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

//to delete clinic profile
exports.deleteClinicProfile = catchAsynsc( 
    async (req, res, next) => {
    
        const deleteclinic = await clinics.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data: deleteclinic
        })
    }
);

//to book appointment into clinic details
exports.bookAppointment = catchAsynsc(
    async (req, res, next) => {
        
        const updateClinic = await clinics.findById(
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
        
        const updateClinic = await clinics.updateOne(
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

