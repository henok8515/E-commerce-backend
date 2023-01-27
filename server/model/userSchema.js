const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
)
module.exports = mongoose.model('User', userSchema)
