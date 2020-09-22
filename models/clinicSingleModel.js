
const singleClinic = {
    typeOfClinic: {
        type: String,
        enum: ['Owned Clinic', 'Visting Clinic'],
        default: 'Owned Clinic'
    },
    clinicName: {
        type: String,
        required: [true, 'Please provide a clinic name'],
    },
    city: String,
    state: String,
    pincode: {
        type: Number,
        length: [6, 'Please provide 6 digit pincode']
    },
    address: String,
    clinicContactNo: Number,
    clinicAdditionalContactNo: Number,
    clinicServices: [String],
    clinicIssues: [String],
    consultationFees: Number,
    holidays: [String],
    avgPatientsPerDay: Number,
    visits: {
        type : Number,
        default : 0
    }

};
module.exports = singleClinic;