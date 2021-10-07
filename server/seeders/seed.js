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

    console.log('\n----- USERS SEEDED -----\n');

    for (newRestaurant of restaurants) {
      // randomly add each restaurant to a slate
      const tempSlate = slates[Math.floor(Math.random() * slates.length)];
      tempSlate.restaurants.push(newRestaurant._id);
      await tempSlate.save();
    };
    console.log('\n----- RESTAURANTS SEEDED -----\n');

    // FIND ALL NEWLY SEEDED AND POPULATED SLATES IN DB
    const seededSlates = await Slate.find({});

    // PUSH EACH OF THE USER'S SLATES TO THEIR SLATES ARRAY
    for (newSeededSlate of seededSlates) {
      if(newSeededSlate.slateCreator === 'Cali'){
        let cali = users.find(user => user.username === 'Cali')
        cali.slates.push(newSeededSlate._id)
        await cali.save()
      } else if (newSeededSlate.slateCreator === 'Fitz'){
        let fitz = users.find(user => user.username === 'Fitz')
        fitz.slates.push(newSeededSlate._id)
        await fitz.save()
      }  else if (newSeededSlate.slateCreator === 'Luna'){
        let luna = users.find(user => user.username === 'Luna')
        luna.slates.push(newSeededSlate._id)
        await luna.save()
      }  else if (newSeededSlate.slateCreator === 'Bella'){
        let bella = users.find(user => user.username === 'Bella')
        bella.slates.push(newSeededSlate._id)
        await bella.save()
      }  else if (newSeededSlate.slateCreator === 'Rocco'){
        let rocco = users.find(user => user.username === 'Rocco')
        rocco.slates.push(newSeededSlate._id)
        await rocco.save()
      } else {
        let tink = users.find(user => user.username === 'Tink')
        tink.slates.push(newSeededSlate._id)
        await tink.save()
      }
    };

    console.log('\n----- SLATES SEEDED -----\n');

    // PUSH EACH OF THE USER'S SLATES TO THEIR SLATES ARRAY
    for (user of users) {
      if(user.username === 'Cali'){
        let caliFriends = users.filter(user => user.username !== 'Cali')
        caliFriends.forEach(friend => user.friends.push(friend._id))
        await user.save()
      } else if (user.username === 'Fitz'){
        let fitzFriends = users.filter(user => user.username !== 'Fitz')
        fitzFriends.forEach(friend => user.friends.push(friend._id))
        await user.save()
      } else if (user.username === 'Bella'){
        let bellaFriends = users.filter(user => user.username !== 'Bella')
        bellaFriends.forEach(friend => user.friends.push(friend._id))
        await user.save()
      } else if (user.username === 'Luna'){
        let lunaFriends = users.filter(user => user.username !== 'Luna')
        lunaFriends.forEach(friend => user.friends.push(friend._id))
        await user.save()
      } else if (user.username === 'Rocco'){
        let roccoFriends = users.filter(user => user.username !== 'Rocco')
        roccoFriends.forEach(friend => user.friends.push(friend._id))
        await user.save()
      } else {
        let tinkFriends = users.filter(user => user.username !== 'Tink')
        tinkFriends.forEach(friend => user.friends.push(friend._id))
        await user.save()
      }
    };

    console.log('\n----- FRIENDS SEEDED -----\n');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
