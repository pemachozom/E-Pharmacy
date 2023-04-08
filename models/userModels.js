const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your name!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'sme', 'pharmacist', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        //password won't be included when we get the users
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate:  {
            validator: function (el) {
                return el == this.password
            },
            message: 'Password are not same'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    // userSchema.pre()
})

const User = mongoose.model('User', userSchema)
module.exports = User