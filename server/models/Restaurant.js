// BRING IN MONGOOSE SCHEMA MODULE 
const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
      type: String,
  },
  image: {
    type: String,
  },
  // saved restaurant id from Yelp API
  restaurantId: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
