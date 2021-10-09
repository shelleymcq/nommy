// BRING IN MONGOOSE SCHEMA AND MODEL MODULES
const { Schema, model } = require('mongoose');

// SLATE SCHEMA
const slateSchema = new Schema({
  name: {
    type: String,
    required: 'You must name your slate!',
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  // RESTAURANTS IS AN ARRAY OF DATA ADHERING TO RESTAURANT SCHEMA
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
  slateCreator: {
    type: String,
    required: true,
  }
});

const Slate = model('Slate', slateSchema);

module.exports = Slate;
