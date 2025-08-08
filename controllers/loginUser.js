const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./.env.local" });

const saltRounds = 10;
const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const loginUser = async (data) => {
  const scholarNo = data.scholarNumber;
  const password = data.password;
  const user = await User.findOne({ scholar_no: scholarNo });
  if (!user) {
    throw new Error("User does not exists");
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Scholar number or password is incorrect");
  }
  const token = jwt.sign(
    { id: user._id, scholar_no: user.scholar_no, username: user.username },
    SECRET,
    {
      expiresIn: EXPIRES_IN,
    },
  );
  return token;
};
module.exports = loginUser;
