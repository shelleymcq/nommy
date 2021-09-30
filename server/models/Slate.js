const { Schema, model } = require('mongoose');

const slateSchema = new Schema({
  name: {
    type: String,
    required: 'You must name your slate!',
    minlength: 1,
    maxlength: 30,
    trim: true,
  },
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
  // slateCreator: {
  //   type: String,
  //   required: true,
  // }
});

const Slate = model('Slate', slateSchema);

module.exports = Slate;
