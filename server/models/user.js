const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String
});

const User = mongoose.model("User", schema);
module.exports = User;
