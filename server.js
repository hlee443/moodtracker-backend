import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import dotenv from 'dotenv';
dotenv.config();
const port = 8080;
const app = express();
import * as db from "./databaseConnection.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/api/moods", async (req, res) => {
    try {
        // console.log(res.data);
        const moods = await db.getMoods();
        res.status(200).json(moods);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/api/moods/:id", async (req, res) => {
    try {
        const moods = await db.getMood(req.params.id);
        res.status(200).json(moods);
    } catch (err) {
        res.status(500).send(err);
    }
});

// create a new mood
app.post("/api/moods", async (req, res) => {
    try {
        const mood = await db.createMood(req.body);
        res.status(200).json(mood);
    } catch (err) {
        res.status(500).send(err);
    }
});

// update a mood
app.put("/api/moods/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const mood = await db.updateMood({...req.body, id});
        res.status(200).json(mood);
    } catch (err) {
        res.status(500).send(err);
    }
});

// delete a mood
app.delete("/api/moods/:id", async (req, res) => {
    try {
        const moods = await db.deleteMood(req.params.id);
        res.status(200).json(moods);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
