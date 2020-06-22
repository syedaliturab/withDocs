const clinic = require('./../models/clinicModel');

//to get list of clinics
exports.getAllClinics = async (req, res) => {
    try {
        const clinics = await clinic.find();
        res.status(200).json({
            status: 'success',
            results: clinics.length,
            data: {
                clinics,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

//to get a clinics by id

exports.getClinicById = async (req, res) => {
    try {
        const clinicById = await clinic.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                clinic: clinicById
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err

        })
    }
}

//to create a clinic

exports.createClinic = async (req, res) => {
    try {
        const newClinic = await clinic.find(req.body);
        res.status(201).json({
            status: success,
            data: {
                clinic: newClinic,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: fail,
            message: err,
        });
    }
};


//to update a clinic details
exports.updateClinic = async (req, res) => {
    try {
        const updateClinic = await clinic.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                clinic: updateClinic
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}




exports.deleteClinic = async (req, res) => {
    try {} catch (err) {}
};