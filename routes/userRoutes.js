const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers);          // GET  /api/users
router.get("/add", addUsers);       // GET  /api/users/add
router.post("/", createUser);       // POST /api/users
router.delete("/:id", deleteUser);  // DELETE /api/users/:id

module.exports = router;
