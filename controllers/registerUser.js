const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = async (data) => {
  const existingUser = await User.findOne({ scholar_no: data.scholarNumber });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const newUser = new User({
    username: data.userName,
    email: data.email,
    phone: data.phoneNumber,
    hostel_no: data.hostelNumber,
    room_no: data.roomNumber,
    scholar_no: data.scholarNumber,
    password: hashedPassword,
  });
  await newUser.save();
  console.log("User registered");
  return true;
};

module.exports = registerUser;
