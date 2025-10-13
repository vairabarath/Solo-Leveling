require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://igris:arise@cluster0.hyz1pdp.mongodb.net/solo-leveling?retryWrites=true&w=majority&appName=Cluster0',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
