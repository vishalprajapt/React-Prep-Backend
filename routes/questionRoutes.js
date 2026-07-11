const express = require("express");
const router = express.Router();

const { addQuestion, getQuestions } = require("../controllers/questionController");

// POST  — question save karo (appid + version middleware already server.js mein hai)
router.post("/creat_question", addQuestion);

// GET — sabhi questions fetch karo
router.get("/get_question", getQuestions);

module.exports = router;
