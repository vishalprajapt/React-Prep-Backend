const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
    answer: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

module.exports = Question;
