
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