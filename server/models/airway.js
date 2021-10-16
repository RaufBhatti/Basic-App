const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    country: String,
    slogan: String,
    head_quaters: String,
    website: String,
    established: Number
});

const Airway = mongoose.model("Airway", schema);

module.exports = Airway;

