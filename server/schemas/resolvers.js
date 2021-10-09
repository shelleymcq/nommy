const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Slate, Restaurant } = require('../models');
const API = require('../utils/api');
// const { default: context } = require('react-bootstrap/esm/AccordionContext');

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
        return User.findOne({ _id: context.user._id }).populate('friends');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    slates: async () => {
      return await Slate.find().populate('restaurants');
    },
    slate: async (_, args) => {
      return await Slate.findOne({ _id: args.id }).populate('restaurants');
    },
    mySlates: async (_, args, context) => {
      
      const mySlates = await Slate.find({slateCreator: args.slateCreator}).populate('restaurants');
      
      return mySlates
    },
    randomSlate: async () => {
      const slates = await Slate.find().populate('restaurants');
      const nonemptySlates = slates.filter(slate => slate.restaurants.length > 1)
      const chosenSlate = nonemptySlates[Math.floor(Math.random() * nonemptySlates.length)]
      return chosenSlate
    },
    myRandomRestaurant: async (_, args, context) => {
      if (context.user) {
        const mySlates = await Slate.find({ slateCreator: context.user.username }).populate('restaurants')
        const chosenSlate = mySlates[Math.floor(Math.random() * mySlates.length)]
        const slateRestaurants = chosenSlate.restaurants
        const chosenRestaurant = slateRestaurants[Math.floor(Math.random() * slateRestaurants.length)]
        
        return chosenRestaurant
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    suggestions: async (_, args) => {
      const suggestions = await Restaurant.find({ category: args.category })
      
      return suggestions
    },
    slateImage: async (_, args, context) => {
      const mySlates = await Slate.find({ slateCreator: args.slateCreator }).populate('restaurants')
      const newArray = mySlates.map((slate)=>{
        const {restaurants} = slate;
        return restaurants[restaurants.length-1] || null
      })
    
      return newArray
    },
    myFriends: async (_, args, context) => {
      const myFriends = await User.findOne({ _id: context.user._id }).populate('friends')

      return myFriends
    },
    nonFriends: async (_, args, context) => {
      
      const nonFriends = await User.find({ username: {$nin: args.friendNameArray} });
      
      return nonFriends
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password, avatar, zipcode }) => {
      const user = await User.create({ username, email, password, avatar, zipcode });
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
      if (context.user) {
        const slate = await Slate.create({
          name,
          slateCreator: context.user.username,
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { slates: {...slate} } },
          {
            new: true,
            runValidators: true,
          }
        ).populate('slates');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addRestaurant: async (parent, { restaurantId, name,  category, image, link, distance, slateId }, context) => {
      if (context.user) {
        // CREATE THE RESTAURANT IN DATABASE FROM THE API DATA
        const restaurant = await Restaurant.create({
          restaurantId,
          name,
          category,
          image,
          link,
          distance
        });

        // FIND THE SLATE AND ADD THE RESTAURANT TO IT
        const updatedSlate = await Slate.findOneAndUpdate(
          { _id: slateId},
          { $addToSet: { restaurants: {...restaurant} } },
          {
            new: true,
            runValidators: true,
          }
        ).populate('restaurants');
        
        // RETURN THE UPDATED SLATE WITH RESTAURANT ADDED
        return updatedSlate.save();
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a book from their own profile
    removeRestaurant: async (parent, { restaurantId, slateId }, context) => {
      if (context.user) {
        // REMOVE THE SELECTED RESTAURANT FROM THE DATABASE
        const removedRestaurant = await Restaurant.findOneAndDelete(
          { restaurantId }
        )
        
        // RETURN THE UPDATED SLATE
        const updatedSlate = await Slate.findOne({_id: slateId}).populate('restaurants');
          
        return updatedSlate;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSlate: async (parent, args, context) => {
      if (context.user) {
        // REMOVE THE SELECTED RESTAURANT FROM THE DATABASE
        const removedSlate = await Slate.findOneAndDelete(
          { _id: args._id }
        )
        return removedSlate
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { _id }, context) => {
      if (context.user) {
        const friend = await User.findOne({
          _id
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          // using an ID from my seeds for testing purposes on GraphQL
          // { _id: "6157e2ac9a561b7ec8a741bb"},
          { $addToSet: { friends: {...friend} } },
          {
            new: true,
            runValidators: true,
            // populate: { path: 'users' }
          }
        ).populate('friends');
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFriend: async (parent, { _id }, context) => {
      if (context.user) {
        const friend = await User.findOne({ _id });
        
        // RETURN THE UPDATED SLATE
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friend._id } },
          {
            new: true,
            runValidators: true,
          }
          ).populate('slates')
          .populate({
            path: 'slates',
            populate: 'restaurants'
          })
          .populate('friends');
          
        return updatedUser;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    editSlate: async (parent, args, context) => {
      if (context.user) {
        // REMOVE THE SELECTED RESTAURANT FROM THE DATABASE
        const updatedSlate = await Slate.findOneAndUpdate(
          { _id: args._id },
          { name: args.name },
          {
            new: true,
            runValidators: true,
          }
        ).populate('restaurants')
        console.log(updatedSlate)
        return updatedSlate.save()
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    apiSearch: async (_, args, context) => {
      try {
        const apiResponse = await API.search(args.searchInput, args.zipcode)
        const businesses = apiResponse.data.businesses;
        const restaurantData = businesses.map((restaurant) => ({
          restaurantId: restaurant.id,
          name: restaurant.name,
          link: restaurant.url,
          image: restaurant.image_url || '',
          distance: (restaurant.distance* 0.000621).toFixed(2),
          category: restaurant.categories[0].title
      }));
        return restaurantData
      }catch(err) {
        console.log(err)
        window.location.reload()
      }
    },
  }
};

module.exports = resolvers;
