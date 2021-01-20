const  {patient, patientRelative, patients} = require('./../models/patientModel.js');
const catchAsynsc = require('./../utils/catchAsync');

//to get Patient
exports.getAllPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const Patient = await patient.find();
        res.status(200).json({
            status: 'success',
            data: Patient
            
        });
    }
);

//to get Patient by id
exports.getPatient = catchAsynsc(
    async (req, res, next) => {

        const Patient = await patient.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: Patient
            
        })
    }
);

//to create Patient profile
exports.createPatientProfile = catchAsynsc(
    async (req, res, next) => {

        const newpatient = await patient.create(req.body);
        newpatient.password = undefined;
        res.status(200).json({
            status: 'success',
            data: newpatient
        });
    }
);



//to update Patient details
exports.updatePatientProfile = catchAsynsc(
    async (req, res, next) => {

        if (req.body.password || req.body.confirmPassword) {
            return res.json({
                status: 'fail'
            })
        }
        const updatedpatient = await patient.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            status: 'success',
            data: updatedpatient
            
        })
    }
);

//to delete Patient profile
exports.deletePatientProfile = catchAsynsc( 
    async (req, res, next) => {
    
        const deletepatient = await patient.findByIdAndRemove(req.params.id);
        
        res.status(200).json({
            status: 'success',
            data:  deletepatient
        })
    }
);

exports.createPatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const getPatient = await patient(req.params.id);
        const createPatientRelative = await patientRelative.create(req.body);

        await getPatient.relatives.push(createPatientRelative);
        
        const updatePatientProfile = await patients.findByIdAndUpdate(
            req.params.id, getPatient, {
                new : true,
                runValidators : true
            }
        );
        res.status(200).json({
            status : 'success',
            data : updatePatientProfile
        })
        
    }
);

exports.getPatientRelativeProfile = catchAsynsc(
    async(req, res, next) =>{
        const getPatientRelative = await patientRelative.findById({_id : req.params.id});
        res.status(200).json({
            status : 'success',
            data : getPatientRelative
        })
    }
)

exports.updatePatientRelativeProfile = catchAsynsc(
    async (req, res, next) => {
        const updatePatientRelative = await patientRelative.findByIdAndUpdate(
            req.params.id, req.body, {
                new : true,
                runValidators : true
            }
        )
        res.status(200).json({
            status : 'success',
            data : updatePatientRelative
        })
    }
);

exports.deletePatientRelativeProfile = catchAsynsc(
    async (req, res, next) =>{
        const deletePatientRelative = await patientRelative.findByIdAndRemove(req.params.id);

        res.status(200).json({
            status : 'success',
            data : deletePatientRelative
        })
    }
);