// BRING IN DB CONNECTION, MODELS, AND SEED JSON DATA
const db = require('../config/connection');
const { User, Slate, Restaurant } = require('../models');
const userSeeds = require('./userSeeds.json');
const slateSeeds = require('./slateSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');

// CONNECT TO DATABASE
db.once('open', async () => {

  try {
    // CLEAN DATABASE
    await Slate.deleteMany({});
    await Restaurant.deleteMany({});
    await User.deleteMany({});

    // BULK CREATE EACH MODEL
    const slates = await Slate.create(slateSeeds);
    const restaurants = await Restaurant.create(restaurantSeeds);
    const users = await User.create(userSeeds);

    console.log('\n----- USERS SEEDED -----\n');

    // RANDOMLY ADD EACH RESTAURANT IN THE DB TO A SLATE IN THE DB
    for (newRestaurant of restaurants) {
      const tempSlate = slates[Math.floor(Math.random() * slates.length)];
      tempSlate.restaurants.push(newRestaurant._id);
      await tempSlate.save();
    };

    console.log('\n----- RESTAURANTS SEEDED -----\n');

    // FIND ALL NEWLY SEEDED AND POPULATED SLATES IN DB
    const seededSlates = await Slate.find({});

    // PUSH EACH OF THE USER'S SLATES TO THEIR USER DATA
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

    // ADD EACH OF THE SEEDED USER'S TO EACH OTHER'S ARRAY OF FRIENDS
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
