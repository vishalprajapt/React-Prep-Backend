const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// POST  — question save karo
router.post("/creat_question", addQuestion);

// GET — sabhi questions fetch karo
router.get("/get_question", getQuestions);

// PUT — question edit karo
router.put("/update_question/:id", updateQuestion);

// DELETE — question delete karo
router.delete("/delete_question/:id", deleteQuestion);

module.exports = router;
