
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
    locality : String,
    state: String,
    pincode: {
        type: Number,
        length: [6, 'Please provide 6 digit pincode']
    },
    address: String,
    clinicContactNo: Number,
    clinicAdditionalContactNo: Number,
    clinicServices:[{
        name : String,
        totalCount : {
          type : Number,
          default : 0
        }
    }], 
    clinicIssues:[{
        name : String,
        totalCount : {
          type : Number,
          default : 0
        }
    }],
    latitude : Number,
    longitude : Number,
    consultationFees: Number,
    holidays: [String],
    avgPatientsPerDay: Number,
    visits: {
        type : Number,
        default : 0
    }
};
module.exports = singleClinic;