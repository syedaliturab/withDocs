
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
    clinicTiming: [{
        day: String,
        slots: [Number],
    }],
    appointment: {
        type: [{
            date: String,
            slots: [Number],
        }],
        default:[{
            date: "7/20/2020",
            slots: [-1,-1,-1,-1,-1,-1,-1,-1,-1,
                -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
                -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
        }]
    },

};
module.exports = singleClinic;