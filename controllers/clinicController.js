const clinics = require('./../models/clinicModel.js');
const catchAsynsc = require('./../utils/catchAsync');

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


