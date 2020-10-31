const mongoose = require('mongoose');
const { Schema } = mongoose;
const author = new Schema({
    name: String,
    age: Number,
});
module.exports = mongoose.model('Author', author);