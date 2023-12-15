const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    name: String,
    stars_count: Number,
    description: String,
    Country: String,
    image_url: String
});

const Hotels = mongoose.model('Hotels', hotelsSchema);

module.exports = Hotels;