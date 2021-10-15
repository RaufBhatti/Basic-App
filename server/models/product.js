const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    price: Number,
    status: Boolean
});

const Product = mongoose.model("Product", schema);

module.exports = Product;

