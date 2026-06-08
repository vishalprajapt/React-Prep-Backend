const User = require("../models/User");

// @desc  Get all users
// @route GET /api/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc  Add sample users
// @route GET /api/users/add
const addUsers = async (req, res, next) => {
  try {
    const sampleUsers = [
      { name: "Vishal" },
      { name: "Rahul" },
      { name: "Aman" },
      { name: "Priya" },
      { name: "Sneha" },
    ];

    const result = await User.insertMany(sampleUsers);
    res.status(201).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc  Create a new user
// @route POST /api/users
const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete a user
// @route DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log(req.params.id)
    console.log(user);;
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, addUsers, createUser, deleteUser };
