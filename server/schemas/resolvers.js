// BRING IN AUTHENTICATION ERROR MODULE, SIGNTOKEN MIDDLEWARE, MODELS, AND CUSTOM API UTIL
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Slate, Restaurant } = require('../models');
const API = require('../utils/api');

const resolvers = {
  Query: {
    // FIND AND RETURN ALL USERS IN DB, POPULATE WITH SLATES AND RESTAURANTS
    users: async () => {
      return User.find().populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    // FIND AND RETURN A USERS IN DB BY ID, POPULATE WITH SLATES AND RESTAURANTS
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    // FIND AND RETURN A USERS IN DB BY NAME, POPULATE WITH SLATES AND RESTAURANTS
    // FOR FUTURE DEVELOPMENT OF SEARCHING FOR FRIENDS TO ADD TO YOUR FRIENDS
    userByName: async (_, args) => {
      return User.findOne({ username: args.username }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    // FIND AND RETURN A USERS IN DB BY EMAIL, POPULATE WITH SLATES AND RESTAURANTS
    // FOR FUTURE DEVELOPMENT OF SEARCHING FOR FRIENDS TO ADD TO YOUR FRIENDS
    userByEmail: async (_, args) => {
      return User.findOne({ email: args.email }).populate('slates').populate({
        path: 'slates',
        populate: 'restaurants'
      }).populate('friends');
    },
    // FIND THE LOGGED IN USER IN DB, POPULATE WITH FRIENDS AND SLATES
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('friends');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // FIND AND RETURN ALL SLATES IN DATABASE, POPULATE WITH ITS ASSOCIATED RESTAURANTS
    slates: async () => {
      return await Slate.find().populate('restaurants');
    },
    // FIND AND RETURN A SLATE IN DB BY ID, POPULATE WITH ITS ASSOCIATED RESTAURANTS
    slate: async (_, args) => {
      return await Slate.findOne({ _id: args.id }).populate('restaurants');
    },
    // FIND AND RETURN ALL SLATES BY A USER VIA SLATE CREATOR PROPERTY, POPULATE WITH ALL ASSOCIATED RESTAURANTS
    mySlates: async (_, args, context) => {
      
      const mySlates = await Slate.find({slateCreator: args.slateCreator}).populate('restaurants');
      
      return mySlates
    },
    // FIND AND RETURN A RANDOM SLATE IN THE DATABASE (THAT ISN'T VOID OF RESTAURANTS), POPULATE WITH ITS ASSOCIATED RESTAURANTS
    randomSlate: async () => {
      const slates = await Slate.find().populate('restaurants');
      const nonemptySlates = slates.filter(slate => slate.restaurants.length > 1)
      const chosenSlate = nonemptySlates[Math.floor(Math.random() * nonemptySlates.length)]
      return chosenSlate
    },
    // FIND AND RETURN A RANDOM RESTAURANT SAVED BY THE LOGGED IN USER
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
    // RETURN ALL RESTAURANTS IN DB WITH A GIVEN CATEGORY
    // FOR FUTURE OR SEPARATE DEVELOPMENT -- API SEARCH REPLACED USE OF THIS QUERY ON HOMEPAGE
    suggestions: async (_, args) => {
      const suggestions = await Restaurant.find({ category: args.category })
      
      return suggestions
    },
    // FIND ALL SLATES BY A USER, POPULATE THEIR ASSOCIATED RESTAURANTS
    // RETURN THE LAST SAVED RESTAURANT'S DATA (FOR RENDERING A SLATE COVER IMAGE) 
    slateImage: async (_, args, context) => {
      const mySlates = await Slate.find({ slateCreator: args.slateCreator }).populate('restaurants')
      const newArray = mySlates.map((slate)=>{
        const {restaurants} = slate;
        return restaurants[restaurants.length-1] || null
      })
    
      return newArray
    },
    // FIND AND RETURN ALL THE LOGGED IN USER'S FRIENDS
    myFriends: async (_, args, context) => {
      const myFriends = await User.findOne({ _id: context.user._id }).populate('friends')

      return myFriends
    },
    // FIND AND RETURN ALL USER'S THAT AREN'T IN THE LOGGED IN USER'S FRIEND LIST
    nonFriends: async (_, args, context) => {
      
      const nonFriends = await User.find({ username: {$nin: args.friendNameArray} });
      
      return nonFriends
    },
  },

  Mutation: {
    // ADD A USER TO DB GIVEN VALID USERNAME, EMAIL, PASSWORD, AVATAR AND ZIPCODE
    // CREATE AND RETURN A TOKEN AND USER DATA
    addUser: async (_, { username, email, password, avatar, zipcode }) => {
      const user = await User.create({ username, email, password, avatar, zipcode });
      const token = signToken(user);
      return { token, user };
    },
    // LOGIN A USER GIVEN VALID EMAIL AND PASSWORD
    // CREATE AND RETURN A TOKEN AND USER DATA
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
    // ADD A SLATE GIVEN A SLATE NAME AND THE LOGGED IN USER'S USERNAME
    // RETURN THE UPDATED USER'S DATA WITH SLATE INCLUDED
    addSlate: async (parent, { name }, context) => {
      // IF USER IS LOGGED IN
      if (context.user) {
        // CREATE THE NEW SLATE
        const slate = await Slate.create({
          name,
          slateCreator: context.user.username,
        });

        // FIND THE LOGGED IN USER, AND PUSH THE SLATE TO THEIR DATA
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { slates: {...slate} } },
          {
            new: true,
            runValidators: true,
          }
        ).populate('slates');

        // RETURN UPDATED USER WITH SLATE ADDED
        return updatedUser;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // ADD A RESTAURANT TO A SLATE GIVEN VALID RESTAURANT PROPERTIES
    // RETURN THE UPDATED SLATE WITH THE RESTAURANT SAVED
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
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // REMOVE A RESTAURANT FROM A SLATE GIVEN A RESTAURANT ID AND SLATE ID
    // FOR FUTURE DEVELOPMENT! - PLACEHOLDER MUTATION FOR WHEN REACT COMPONENTS ARE CREATED TO HANDLE
    removeRestaurant: async (parent, { restaurantId, slateId }, context) => {
      // USER MUST BE LOGGED IN
      if (context.user) {
        // REMOVE THE SELECTED RESTAURANT FROM THE DATABASE
        const removedRestaurant = await Restaurant.findOneAndDelete(
          { restaurantId }
        )
        
        // RETURN THE UPDATED SLATE, POPULATE RESTAURANT DATA
        const updatedSlate = await Slate.findOne({_id: slateId}).populate('restaurants');
        
        // RETURN THE UPDATED SLATE WITH RESTAURANT REMOVED
        return updatedSlate;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // REMOVE A SLATE FROM DB GIVEN A SLATE ID
    removeSlate: async (parent, args, context) => {
      // USER MUST BE LOGGED IN
      if (context.user) {
        // REMOVE THE SELECTED SLATE FROM THE DATABASE
        const removedSlate = await Slate.findOneAndDelete(
          { _id: args._id }
        )
        
        return removedSlate
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // ADD FRIEND TO LOGGED IN USER'S PROFILE GIVEN A FRIEND ID
    addFriend: async (parent, { _id }, context) => {
      // USER MUST BE LOGGED IN
      if (context.user) {
        // FIND A USER BY THE ID OF THE USER YOU WANT TO ADD AS A FRIEND
        const friend = await User.findOne({
          _id
        });

        // FIND THE LOGGED IN USER DATA AND PUSH THE FRIEND TO THEIR FRIENDS ARRAY
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: {...friend} } },
          {
            new: true,
            runValidators: true,
          }
        ).populate('friends');

        // RETURN UPDATED DATA FOR LOGGED IN USER W/ FRIEND ADDED
        return updatedUser;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // REMOVE A FRIEND FROM THE LOGGED IN USER'S PROFILE GIVEN A FRIEND ID
    // FUTURE DEVELOPMENT! - PLACEHOLDER MUTATION FOR WHEN REACT COMPONENTS ARE CREATED TO HANDLE
    removeFriend: async (parent, { _id }, context) => {
      // USER
      if (context.user) {
        // FIND A USER BY THE ID OF THE USER YOU WANT TO REMOVE AS A FRIEND
        const friend = await User.findOne({ _id });
        
        // FIND THE LOGGED IN USER DATA AND REMOVE FRIEND FROM FRIENDS ARRAY
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
        
        // RETURN UPDATED DATA FOR LOGGED IN USER WITH FRIEND REMOVED
        return updatedUser;
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // EDIT SLATE NAME GIVEN THE SLATE ID
    editSlate: async (parent, args, context) => {
      // USER MUST BE LOGGED IN
      if (context.user) {
        // FIND THE SLATE BY ID, AND CHANGE SLATE NAME TO INPUT NAME
        const updatedSlate = await Slate.findOneAndUpdate(
          { _id: args._id },
          { name: args.name },
          {
            new: true,
            runValidators: true,
          }
        ).populate('restaurants')
        
        // RETURN UPDATED SLATE WITH NEW NAME
        return updatedSlate.save()
      }
      // THROW ERROR IF USER NOT LOGGED IN
      throw new AuthenticationError('You need to be logged in!');
    },
    // YELP FUSION API SEARCH USING AXIOS IN UTILS
    apiSearch: async (_, args, context) => {
      try {
        // FETCH DATA FOR USER'S SEARCH INPUT AND THEIR USER'S ZIPCODE
        const apiResponse = await API.search(args.searchInput, args.zipcode)
        // GRAB THE BUSINESSES FROM THE API RESPONSE
        const businesses = apiResponse.data.businesses;
        // MAP THE API DATA FOR EACH BUSINESS TO MATCH THE RESTAURANT MODEL
        // CONVERT METERS TO MILES FOR DISTANCE & ONLY GRAB FIRST CATEGORY LISTED
        const restaurantData = businesses.map((restaurant) => ({
          restaurantId: restaurant.id,
          name: restaurant.name,
          link: restaurant.url,
          image: restaurant.image_url || '',
          distance: (restaurant.distance* 0.000621).toFixed(2),
          category: restaurant.categories[0].title
      }));

        // RETURN THE RESTAURANT DATA
        return restaurantData
      }catch(err) {
        console.log(err)
        window.location.reload()
      }
    },
  }
};

module.exports = resolvers;
