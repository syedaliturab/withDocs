const clinics = require('./../models/clinicModel.js');
const catchAsynsc = require('./../utils/catchAsync');
const { holidays } = require('../models/clinicSingleModel.js');

const searchIndex = (day,days) => {
    for( var element of days){
        if(element === day){
            return true;
        }
    }
    return false
}


const listHoliday = function (arr1, arr2) {

	var holidays = [];
	for (var i = 0; i < arr1.length; i++) {
        var flag = 0;
        for( var j = 0; j< arr2.length; j++){
            if (arr1[i].day === arr2[j].day) {
                flag = 1;
                break;
            }
        }
        if(flag === 0){
            holidays.push(arr1[i].day);
        }
	}
	return holidays;

}

const listMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

}

const arraysMatch = (arr1, arr2) => {

    var weekday = [];
    var flag = 0;
	for (var i = 0; i < arr1.length; i++) {
        for( var j = 0; j< arr2.length; j++){
            if (arr1[i].day === arr2[j].day) {
                if (!listMatch(arr1[i].slots,arr2[j].slots)){
                    weekday.push(arr1[i].day);
                }
            }
        }
	}
	return weekday;

}


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

        const clinic = await clinics.findById(req.body.id);
        var holidays = listHoliday(clinic.clinicOne.clinicTiming,req.body.clinicOne.clinicTiming);
        var timingChange = arraysMatch(clinic.clinicOne.clinicTiming,req.body.clinicOne.clinicTiming);
        const weekdays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        var current = new Date()
        for(var element of clinic.clinicOne.appointment){
            var future = new Date(element.date);
            if(future >= current){
                day = weekdays[future.getDay()];
                if(searchIndex(day,holidays)){
                    console.log("You have decleared `"+ day +"` as holiday. So, kindly push appointment of '"+ future+"' to another available working day.")
                }else if(searchIndex(day,timingChange)){
                    var slots;
                    for(var element of req.body.clinicOne.clinicTiming){
                        if(element.day===day){
                            slots = element.slots;
                            break;
                        }
                    }
                    console.log(element.slots)
                    console.log(slots)
                }
            }
        }

        // const updateClinic = await clinics.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,{
        //         new: true,
        //         runValidators: true
        //     }
        // );
        res.status(200).json({
            status: 'success',
            data: clinic
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


