const Question = require("../models/Question");

// POST /api/questions/get_question  — question save karo
const addQuestion = async (req, res) => {
  try {
    const { title, tags, difficulty, status, answer } = req.body;

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
    const { Type } = req.query; // <-- req.query ki jagah req.body

    let filter = {};

    if (Number(Type) === 1) {
      filter.status = "Published";
    }

    // console.log(filter);

    const questions = await Question.find(filter).sort({ createdAt: -1 });

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

// PUT /api/questions/:id  — question edit karo
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tags, difficulty, status, answer } = req.body;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // sirf jo fields aaye hain unhe update karo
    if (title !== undefined) question.title = title;
    if (tags !== undefined) question.tags = tags;
    if (difficulty !== undefined) question.difficulty = difficulty;
    if (status !== undefined) question.status = status;
    if (answer !== undefined) question.answer = answer;

    const updated = await question.save();

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/questions/:id  — question delete karo
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addQuestion, getQuestions, updateQuestion, deleteQuestion };
