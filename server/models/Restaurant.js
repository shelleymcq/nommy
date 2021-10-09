// BRING IN MONGOOSE SCHEMA AND MODEL MODULES
const { Schema, model } = require('mongoose');

// RESTAURANT SCHEMA
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
  // SAVED RESTAURANT ID FROM YELP API
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
