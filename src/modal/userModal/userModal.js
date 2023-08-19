const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  company_name: String,
  phone: String,
});

const User = mongoose.model('userinfo', userInfoSchema);
module.exports = {User};