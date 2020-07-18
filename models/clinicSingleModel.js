
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
        morningSlots: String,
        afternoonSlots: String,
        eveningSlots: String,
        onlineSlots: String
    }],
    appointment: {
        type: [{
            date: String,
            morningSlots: [{
                id: String,
                time: String,
                name: String,
                contactNo: String,
                gender: String
            }],
            afternoonSlots: [{
                id: String,
                time: String,
                name: String,
                contactNo: String,
                gender: String
            }],
            eveningSlots: [{
                id: String,
                time: String,
                name: String,
                contactNo: String,
                gender: String
            }],
            onlineSlots: [{
                id: String,
                time: String,
                name: String,
                contactNo: String,
                gender: String
            }]
        }],
        default: [],
    }
};
module.exports = singleClinic;