const mongoose = require('mongoose');
const { seedQuests } = require('./questsSeeder');
const { seedTitles } = require('./titlesSeeder');
const { MONGO_URI } = require('../config/env');

const runSeeds = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Run seeders
    console.log('Starting database seeding...');
    
    await seedQuests();
    await seedTitles();
    
    console.log('Database seeding completed successfully!');
    console.log('You can now start the server with: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runSeeds();
}

module.exports = { runSeeds };
