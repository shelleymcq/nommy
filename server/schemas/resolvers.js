const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Slate, Restaurant } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    userByName: async (_, args) => {
      return User.findOne({ username: args.username }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    userByEmail: async (_, args) => {
      return User.findOne({ email: args.email }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
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
    slate: async (_, args) => {
      return Slate.findOne({ _id: args.id }).populate('restaurants');
    }
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
          // using an ID from my seeds for testing purposes on GraphQL
          { _id: "6157e2ac9a561b7ec8a741bb"},
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
    addRestaurant: async (parent, { restaurantId, name,  category, image, link, distance, slateId }, context) => {
      // if (context.user) {
        // CREATE THE RESTAURANT IN DATABASE FROM THE API DATA
        const restaurant = await Restaurant.create({
          restaurantId,
          name,
          category,
          image,
          link,
          distance
        });

        // console.log("restaurant to create:", restaurant)

        // FIND THE SLATE AND ADD THE RESTAURANT TO IT
        const updatedSlate = await Slate.findOneAndUpdate(
          { _id: slateId},
          { $addToSet: { restaurants: {...restaurant} } },
          {
            new: true,
            runValidators: true,
          }
        ).populate('restaurants');
        // console.log("updatedSlate:",updatedSlate)
        // RETURN THE UPDATED SLATE WITH RESTAURANT ADDED
        return updatedSlate;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a book from their own profile
    removeRestaurant: async (parent, { restaurantId, slateId }, context) => {
      // if (context.user) {
        // REMOVE THE SELECTED RESTAURANT FROM THE DATABASE
        const removedRestaurant = await Restaurant.findOneAndDelete(
          { restaurantId }
        )
        // console.log("removed restaurant:", removedRestaurant)
        
        // RETURN THE UPDATED SLATE
        const updatedSlate = await Slate.findOne({_id: slateId}).populate('restaurants');
          
        return updatedSlate;
      // }
      // THROW ERROR IF USER NOT LOGGED IN
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeSlate: async (parent, { _id }, context) => {
      // if (context.user) {
        // REMOVE THE SELECTED RESTAURANT FROM THE DATABASE
        const removedSlate = await Slate.findOneAndDelete(
          { _id }
        )
        console.log("removed slate:", removedSlate)
        
        // RETURN THE UPDATED SLATE
        const updatedUser = await User.findOne(
          // { _id: context.user._id },
          // using an ID from my seeds for testing purposes on GraphQL
          { _id: "6157e2ac9a561b7ec8a741bb"}
          ).populate('slates')
          .populate({
            path: 'slates',
            populate: 'restaurants'
          });
          
        return updatedUser;
      // }
      // THROW ERROR IF USER NOT LOGGED IN
      // throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { _id }, context) => {
      //if (context.user) {
        const friend = await User.findOne({
          _id
        });

        console.log("new friend:", friend)
        console.log("new friend:", friend.username)

        const updatedUser = await User.findOneAndUpdate(
          // { _id: context.user._id },
          // using an ID from my seeds for testing purposes on GraphQL
          { _id: "6157e2ac9a561b7ec8a741bb"},
          { $addToSet: { friends: {...friend} } },
          {
            new: true,
            runValidators: true,
            // populate: { path: 'users' }
          }
        ).populate('friends');
        // console.log("updatedUser:",updatedUser)
        return updatedUser;
      //}
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeFriend: async (parent, { _id }, context) => {
      // if (context.user) {
        const friend = await User.findOne({ _id });

        // console.log("friend to be removed:", friend)
        
        // RETURN THE UPDATED SLATE
        const updatedUser = await User.findOneAndUpdate(
          // { _id: context.user._id },
          // using an ID from my seeds for testing purposes on GraphQL
          { _id: "6157e2ac9a561b7ec8a741bb"},
          { $pull: { friends: friend._id } },
          {
            new: true,
            runValidators: true,
            // populate: { path: 'users' }
          }
          ).populate('slates')
          .populate({
            path: 'slates',
            populate: 'restaurants'
          })
          .populate('friends');
          
        return updatedUser;
      // }
      // THROW ERROR IF USER NOT LOGGED IN
      // throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
