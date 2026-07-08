const Question = require("../models/Question");

// POST /api/questions/get_question  — question save karo
const addQuestion = async (req, res) => {
  try {
    const { title, tags, difficulty, status, answer } = req.body;

    // title required hai
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question title is required",
      });
    }

    const question = await Question.create({
      title,
      tags: tags || [],
      difficulty: difficulty || "Easy",
      status: status || "Draft",
      answer: answer || "",
    });

    res.status(201).json({
      success: true,
      message: "Question saved successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/questions  — sabhi questions fetch karo
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addQuestion, getQuestions };
