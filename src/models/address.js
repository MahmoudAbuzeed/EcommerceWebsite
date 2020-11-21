/*const mongoose = require('mongoose');

const adderssSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 10
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    pinCode: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 10
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    cityDistrictionTown: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        min: 10,
        max: 100
    },
    alternatePhone: {
        type: String
    },
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'work'],
        required: true
    }
});

const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: [adderssSchema]
}, { timestamps: true})


module.exports = mongoose.model('UserAddress', userAddressSchema)*/


const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    pinCode: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    cityDistrictTown: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        required: true
    },
    landmark: {
        type: String,
        min: 10,
        max: 100
    },
    alternatePhone: {
        type: String
    },
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'work'],
        required: true
    }
});

/*const userAddressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: [addressSchema]
}, { timestamps: true });*/


module.exports = mongoose.model('UserAddress', userAddressSchema);