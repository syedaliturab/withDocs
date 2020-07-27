const appointments = require('./../models/appointmentModel.js');
const clinics = require('./../models/clinicModel.js');
const catchAsynsc = require('./../utils/catchAsync');

const searchIndex = (date,appointment) => {
    var i = 0;
    for( var element of appointment){
        if(element.date == date){
            return i;
        }
        i++;
    }
    return -1;
}

//to get All appointments by doctorId
exports.getAppointmentsByDoctorId = catchAsynsc(
    async (req, res, next) => {
        const allAppointments = await appointments.find({doctorId: req.params.id});
        res.status(200).json({
            status: 'success',
            data: allAppointments
        });
    }
);

//to get All appointments by patientId
exports.getAppointmentsByPatientId = catchAsynsc(
    async (req, res, next) => {
        const allAppointments = await appointments.find({patientId: req.params.id});
        res.status(200).json({
            status: 'success',
            data: allAppointments
        });
    }
);

//to book appointment into clinic details
exports.bookAppointment = catchAsynsc(
    async (req, res, next) => {

        const clinic = await clinics.findById(req.body.clinicId);
        const clinicOne = clinic.clinicOne;
        var d = new Date(req.body.date);
        const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        var day = weekday[d.getDay()];
        var slots;
        for(var element of clinicOne.clinicTiming){
            if(element.day===day){
                slots = element.slots;
                break;
            }
        }
        var i = searchIndex(req.body.date,clinicOne.appointment);
        if(i===-1){
            var app = [-1,-1,-1,-1,-1,-1,-1,-1,-1,
                -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
            slots.forEach(element => {
                app[element-1] = 0
            });
            app[req.body.slot-1] = 1
            var appointment = {
                date: req.body.date,
                slots: app
            } 
            clinicOne.appointment.push(appointment);
        }else{
            console.log("Called")
            clinicOne.appointment[i].slots[req.body.slot-1] = 1
        }
        var query = {
            clinicOne: clinicOne
        }
        const xyz = await clinics.findByIdAndUpdate(
            req.body.clinicId,
            query,{
                new: true,
                runValidators: true
            });
        const newappointment = await appointments.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newappointment
        });
    
    }
);

//to complete appointment into clinic details
exports.completeAppointment = catchAsynsc(
    async (req, res, next) => {
        var appointment;
        if(req.body.status == "confirmed"){
            appointment = await appointments.findByIdAndUpdate(
                req.body.bookId,
                {status: "confirmed"},{
                    new: true,
                    runValidators: true
                }
            );
        }else if(req.body.status == "cancelled"){
            appointment = await appointments.findByIdAndUpdate(
                req.body.bookId,{
                    status: "cancelled"
                },{
                    new: true,
                    runValidators: true
                }
            );
            const clinic = await clinics.findById(req.body.clinicId);
            const clinicOne = clinic.clinicOne;
            var i = searchIndex(req.body.date,clinicOne.appointment);
            clinicOne.appointment[i].slots[req.body.slot-1] = 0
            var query = {
                clinicOne: clinicOne
            }
            const xyz = await clinics.findByIdAndUpdate(
                req.body.clinicId,
                query,{
                    new: true,
                    runValidators: true
                });

        }else if(req.body.status == "pushed"){
            appointment = await appointments.findByIdAndUpdate(
                req.body.bookId,{
                    status: "pushed",
                    slot: req.body.newSlot
                },{
                    new: true,
                    runValidators: true
                }
            );
            const clinic = await clinics.findById(req.body.clinicId);
            const clinicOne = clinic.clinicOne;
            var i = searchIndex(req.body.date,clinicOne.appointment);
            clinicOne.appointment[i].slots[req.body.lastSlot-1] = 0
            clinicOne.appointment[i].slots[req.body.newSlot-1] = 1
            var query = {
                clinicOne: clinicOne
            }
            const xyz = await clinics.findByIdAndUpdate(
                req.body.clinicId,
                query,{
                    new: true,
                    runValidators: true
                });

        }
        res.status(200).json({
            status: 'success',
            data: appointment
        });
    }
);

//to book appointment into clinic details
exports.bookClinicTwoAppointment = catchAsynsc(
    async (req, res, next) => {

        const clinic = await clinics.findById(req.body.clinicId);
        const clinicTwo = clinic.clinicTwo;
        var d = new Date(req.body.date);
        var weekday = new Array(7);
        weekday[0] = "sunday";
        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";
        weekday[6] = "saturday";
        var day = weekday[d.getDay()];
        var slots;
        for(var element of clinicTwo.clinicTiming){
            if(element.day===day){
                slots = element.slots;
                break;
            }
        }
        var i = searchIndex(req.body.date,clinicTwo.appointment);
        if(i===-1){
            var app = [-1,-1,-1,-1,-1,-1,-1,-1,-1,
                -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
            slots.forEach(element => {
                app[element-1] = 0
            });
            app[req.body.slot-1] = 1
            var appointment = {
                date: req.body.date,
                slots: app
            } 
            clinicTwo.appointment.push(appointment);
        }else{
            console.log("Called")
            clinicTwo.appointment[i].slots[req.body.slot-1] = 1
        }
        var query = {
            clinicTwo: clinicTwo
        }
        const xyz = await clinics.findByIdAndUpdate(
            req.body.clinicId,
            query,{
                new: true,
                runValidators: true
            });
        const newappointment = await appointments.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newappointment
        });
    
    }
);

//to complete appointment into clinic details
exports.completeClinicTwoAppointment = catchAsynsc(
    async (req, res, next) => {
        var appointment;
        if(req.body.status == "confirmed"){
            appointment = await appointments.findByIdAndUpdate(
                req.body.bookId,
                {status: "confirmed"},{
                    new: true,
                    runValidators: true
                }
            );
        }else if(req.body.status == "cancelled"){
            appointment = await appointments.findByIdAndUpdate(
                req.body.bookId,{
                    status: "cancelled"
                },{
                    new: true,
                    runValidators: true
                }
            );
            const clinic = await clinics.findById(req.body.clinicId);
            const clinicTwo = clinic.clinicTwo;
            var i = searchIndex(req.body.date,clinicTwo.appointment);
            clinicTwo.appointment[i].slots[req.body.slot-1] = 0
            var query = {
                clinicTwo: clinicTwo
            }
            const xyz = await clinics.findByIdAndUpdate(
                req.body.clinicId,
                query,{
                    new: true,
                    runValidators: true
                });

        }else if(req.body.status == "pushed"){
            appointment = await appointments.findByIdAndUpdate(
                req.body.bookId,{
                    status: "pushed",
                    slot: req.body.newSlot
                },{
                    new: true,
                    runValidators: true
                }
            );
            const clinic = await clinics.findById(req.body.clinicId);
            const clinicTwo = clinic.clinicTwo;
            var i = searchIndex(req.body.date,clinicTwo.appointment);
            clinicTwo.appointment[i].slots[req.body.lastSlot-1] = 0
            clinicTwo.appointment[i].slots[req.body.newSlot-1] = 1
            var query = {
                clinicTwo: clinicTwo
            }
            const xyz = await clinics.findByIdAndUpdate(
                req.body.clinicId,
                query,{
                    new: true,
                    runValidators: true
                });

        }
        res.status(200).json({
            status: 'success',
            data: appointment
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