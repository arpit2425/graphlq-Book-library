const mongoose = require('mongoose');
const { Schema } = mongoose;
const book = new Schema({
    title: String,
    price: Number,
    authorId: String,
});
module.exports = mongoose.model('Book', book);