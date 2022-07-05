const mongoose = require('mongoose');
require("dotenv").config();

// database connection
const uri = process.env.MONGODB_URL;
async function connect() {
  try {
      await mongoose.connect(`${uri}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Connect database successfully!!!');
  } catch (error) {
      console.log('Connect database failure!!!', error);
  }
}

module.exports = { connect };