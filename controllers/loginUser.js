const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const loginUser = async (data) => {
  console.log(data);
  return true;
};
module.exports = loginUser;
