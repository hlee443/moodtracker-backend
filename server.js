import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import dotenv from "dotenv";
import {getMoods, addMood, updateMood, deleteMood, getMood} from "./databaseAccessLayer.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
// import database from "./databaseConnection.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/test", (req, res) => {
  res.status(200).send({ message: "It's working" });
  return;
});

app.get("/api/moods", async (req, res) => {
  try {
    const moods = await getMoods();
    // console.log(moods);
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/moods/:id", async (req, res) => {
  try {
    const moods = await getMood(req.params.id);
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).send(err);
  }
});

// create a new mood
app.post("/api/moods", async (req, res) => {
  try {
    // console.log(req.body);
    const mood = await addMood(req.body);
    console.log(mood);
    res.status(200).json(mood);
  } catch (err) {
    res.status(500).send(err);
  }
});

// update a mood
app.put("/api/moods/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    // console.log(req.body)
    const mood = await updateMood({ ...req.body, id });
    res.status(200).json(mood);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete a mood
app.delete("/api/moods/:id", async (req, res) => {
  try {
    const moods = await deleteMood(+req.params.id);
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
