
const singleClinic = {
    typeOfClinic: String,
    clinicName: String,
    city: String,
    state: String,
    pincode: Number,
    clinicAddress: {
        coordinates: {
            type: [Number],
            default: [],
        },
        address: String
    },
    clinicContactNo: Number,
    clinicAdditionalContactNo: Number,
    clinicSpecialization: [String],
    clinicServices: [String],
    consultationFees: Number,
    holidays: [String],
    clinicTiming: [{
        day: String,
        slots: [Number],
    }],
    appointment: [{
        date: String,
        slots: [Number],
    }],

};
module.exports = singleClinic;