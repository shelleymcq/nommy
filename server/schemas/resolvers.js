const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Slate, Restaurant } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      });
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    slates: async () => {
      return Slate.find().populate('restaurants');
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addSlate: async (parent, { name }, context) => {
      //if (context.user) {
        const slate = await Slate.create({
          name,
          // slateCreator: context.user.username,
        });

        // console.log("new slate:", slate._id)

        const updatedUser = await User.findOneAndUpdate(
          // { _id: context.user._id },
          { _id: "6154f276e6bd495ea0db08ee"},
          { $addToSet: { slates: {...slate} } },
          {
            new: true,
            runValidators: true,
          }
        ).populate('slates');
        // console.log("updatedUser:",updatedUser)
        return updatedUser;
      //}
      // throw new AuthenticationError('You need to be logged in!');
    },
    addRestaurant: async (parent, { restaurantId, name,  category, image, link, slateId, distance }, context) => {
      if (context.user) {
        const restaurant = await Restaurant.create({
          restaurantId,
          name,
          category,
          image,
          link,
          distance
        });

        console.log("restaurant to create:", restaurant)

        const slate = await Slate.findOneAndUpdate(
          { _id: slateId },
          { $addToSet: { 
            restaurants: {
              restaurantId, 
              name,  
              category, 
              image, 
              link, 
              distance 
            } 
          } }
        );
        console.log("updated slate:", slate)
        return slate;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
