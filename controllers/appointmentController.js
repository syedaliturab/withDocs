const appointments = require('./../models/appointmentModel.js');
const doctors = require('./../models/doctorModel.js');
const catchAsynsc = require('./../utils/catchAsync');

const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const listSlots = { "00:00-00:30":1,"00:30-01:00":2,"01:00-01:30":3,"01:30-02:00":4,"02:00-02:30":5,
                    "02:30-03:00":6,"03:00-03:30":7,"03:30-4:00":8,"04:00-04:30":9,"04:30-05:00":10,
                    "05:00-05:30":11,"05:30-06:00":12,"06:00-06:30":13,"06:30-07:00":14,"07:00-07:30":15,
                    "07:30-08:00":16,"08:00-08:30":17,"08:30-09:00":18,"09:00-09:30":19,"09:30-10:00":20,
                    "10:00-10:30":21,"10:30-11:00":22,"11:00-11:30":23,"11:30-12:00":24,"12:00-12:30":25,
                    "12:30-13:00":26,"13:00-13:30":27,"13:30-14:00":28,"14:00-14:30":29,"14:30-15:00":30,
                    "15:00-15:30":31,"15:30-16:00":32,"16:00-16:30":33,"16:30-17:00":34,"17:00-17:30":35,
                    "17:30-18:00":36,"18:00-18:30":37,"18:30-19:00":38,"19:00-19:30":39,"19:30-20:00":40,
                    "20:00-20:30":41,"20:30-21:00":42,"21:00-21:30":43,"21:30-22:00":44,"22:00-22:30":45,
                    "22:30-23:00":46,"23:00-23:30":47,"23:30-24:00":48
                }

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
        
        const appointment = await appointments.create(req.body);
        res.status(200).json({
            status: 'success',
            data: appointment
        });
    
    }
);

//to book appointment into clinic details
exports.fatchAppointment = catchAsynsc(
    async (req, res, next) => {

        // const doctor = await doctors.findById(req.body.doctorId);
        // var date = new Date(req.body.date);
        // var day = weekday[date.getDay()];
        // var slots = doctor.workingHours[day];
        var slots = { "00:00-00:30":[],"00:30-01:00":[],"01:00-01:30":[],"01:30-02:00":[],"02:00-02:30":[],
            "02:30-03:00":[],"03:00-03:30":[],"03:30-04:00":[],"04:00-04:30":[],"04:30-05:00":[],
            "05:00-05:30":[],"05:30-06:00":[],"06:00-06:30":[],"06:30-07:00":[],"07:00-07:30":[],
            "07:30-08:00":[],"08:00-08:30":[],"08:30-09:00":[],"09:00-09:30":[],"09:30-10:00":[],
            "10:00-10:30":[],"10:30-11:00":[],"11:00-11:30":[],"11:30-12:00":[],"12:00-12:30":[],
            "12:30-13:00":[],"13:00-13:30":[],"13:30-14:00":[],"14:00-14:30":[],"14:30-15:00":[],
            "15:00-15:30":[],"15:30-16:00":[],"16:00-16:30":[],"16:30-17:00":[],"17:00-17:30":[],
            "17:30-18:00":[],"18:00-18:30":[],"18:30-19:00":[],"19:00-19:30":[],"19:30-20:00":[],
            "20:00-20:30":[],"20:30-21:00":[],"21:00-21:30":[],"21:30-22:00":[],"22:00-22:30":[],
            "22:30-23:00":[],"23:00-23:30":[],"23:30-24:00":[]
        }
        
        const appointment = await appointments.find({
            date: req.body.date,
            doctorId: req.body.doctorId
        });
        for(var element of appointment){
            slots[element.slot].push(element);
        }
        
        res.status(200).json({
            status: 'success',
            data: slots
        });
        // var slot;
        // if(slotNum>24){ // Evening Slots
        //     slot = slots.morning;
        // } else { // Morning Slots
        //     slot = slots.morning;
        // }
    
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