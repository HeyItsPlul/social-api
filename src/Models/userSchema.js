const mongoDB = require('mongoose')

const userModel = mongoDB.Schema({
    userName: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    DateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    hobbies: {
        type: Array,
        default: null
    },
    key: {
        type: Number,
        required: true
    }

})


module.exports = mongoDB.model('userSchema', userModel)