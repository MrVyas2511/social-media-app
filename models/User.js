const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
     about: String,
     gender:String
})

module.exports = model('User', userSchema);