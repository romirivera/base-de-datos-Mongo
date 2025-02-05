const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/back-end-users17');
  } catch (error) {
    console.log(error);
  }
};
module.exports = { dbConnection };
