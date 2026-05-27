const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());
const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
  try {
    await client.connect();

    db = client.db("reactprep");

    console.log("MongoDB Connected 🚀");
  } catch (error) {
    console.log(error);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/add-users", async (req, res) => {
  const users = [
    { name: "Vishal" },
    { name: "Rahul" },
    { name: "Aman" },
    { name: "Priya" },
    { name: "Sneha" }
  ];

  const result = await db.collection("users").insertMany(users);

  res.send(result);
});

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();

  res.send(users);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});