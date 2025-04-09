const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuseumSchema = new Schema({
    name: String,
    about: String,
    location: String,
    price: String,
    hours: String,
    website: String
});

module.exports = mongoose.model('Museum',MuseumSchema);