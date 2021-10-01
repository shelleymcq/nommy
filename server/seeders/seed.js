const db = require('../config/connection');
const { User, Slate, Restaurant } = require('../models');
const userSeeds = require('./userSeeds.json');
const slateSeeds = require('./slateSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');

db.once('open', async () => {

  try {
    // clean database
    await Slate.deleteMany({});
    await Restaurant.deleteMany({});
    await User.deleteMany({});

    // bulk create each model
    const slates = await Slate.create(slateSeeds);
    const restaurants = await Restaurant.create(restaurantSeeds);
    const users = await User.create(userSeeds);

    for (newRestaurant of restaurants) {
      // randomly add each restaurant to a slate
      const tempSlate = slates[Math.floor(Math.random() * slates.length)];
      tempSlate.restaurants.push(newRestaurant._id);
      await tempSlate.save();
    };

    // FIND ALL NEWLY SEEDED AND POPULATED SLATES IN DB
    const seededSlates = await Slate.find({});

    for (newSeededSlate of seededSlates) {
      // randomly add each slate to a user
      const tempUser = users[Math.floor(Math.random() * users.length)];
      tempUser.slates.push(newSeededSlate._id);
      await tempUser.save();
    };

    console.log('\n----- RESTAURANTS SEEDED -----\n');
    console.log('\n----- SLATES SEEDED -----\n');
    console.log('\n----- USERS SEEDED -----\n');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
