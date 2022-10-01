import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  multipleStatements: false,
  namedPlaceholders: true,
};

const database = mysql.createPool(dbConfig).promise();

export async function getMoods() {
  // console.log("hi");
  let sqlQuery = "SELECT * FROM moods";
  const [moods] = await database.query(sqlQuery);
  // console.log(moods,"help me")
  return moods;
}

export async function getMood(id) {
  let sqlQuery = "SELECT * FROM moods WHERE id = ?";
  // console.log(id);
  const [mood] = await database.query(sqlQuery, [id]);
  // console.log([mood]);
  return mood;
}

export async function addMood({ note, rating, date }) {
  // console.log(note);
  // console.log(rating);
  // console.log(date);
  let sqlQuery = "INSERT INTO moods (note, rating, date) VALUES (?,?,?)";
  const [mood] = await database
    .query(sqlQuery, [note, rating, date])
    .then(([result]) => getMood(result.insertId));
  // console.log([mood],"mood")
  return mood;
}

export async function updateMood({ id, newNote, newRating }) {
  console.log(newNote);
  console.log(newRating);
  console.log(id);
  let sqlQuery = "UPDATE moods SET note = ?, rating = ? WHERE id = ?";
  // console.log(id, note, rating);
  const [mood] = await database
    .query(sqlQuery, [newNote, newRating, id])
    .then(() => getMood(id));
  // console.log(getMood(id));
  return mood;
}

export async function deleteMood(id) {
  let sqlQuery = "DELETE FROM moods WHERE id = ?";
  const mood = await database.query(sqlQuery, [id]);
  return mood;
}
