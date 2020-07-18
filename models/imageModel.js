const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    id: {
        type: String,
        requried: [true, 'Please provide valid id']
    },
    role: {
        type: String,
        enum: ['profile', 'clinic', 'document'],
        default: 'profile'
    },
    image: {
        type: [Number],
        default: []
    }
    
});

const images = mongoose.model('Images',imageSchema);
module.exports = images;