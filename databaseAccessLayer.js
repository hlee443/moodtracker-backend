import database from "./databaseConnection";

export async function getMoods() {
	let sqlQuery = "SELECT * FROM moods";
	const moods = await database.query(sqlQuery);
	// console.log(moods,"help me")
	return moods;
}

async function getMood(id) {
	let sqlQuery = "SELECT * FROM moods WHERE id = ?";
	const [mood] = await database.query(sqlQuery, [id]);
	return mood;
}

export async function addMood(note, rating, date) {
	let sqlQuery = "INSERT INTO moods (note, rating, date) VALUES (?,?,?)";
	const [mood] = await database.query(sqlQuery, [note, rating, date]).then(([result]) => getMood(result.insertId));
	// console.log([mood],"mood")
	return mood;
}

export async function updateMood(id, note, rating) {
	let sqlQuery = "UPDATE moods SET note = ?, rating = ? WHERE id = ?";
	const [mood] = await database.query(sqlQuery, [note, rating, id]).then(() => getMood(id));
	return mood;
}

export async function deleteMood(id) {
	let sqlQuery = "DELETE FROM moods WHERE id = ?";
	const mood = await database.query(sqlQuery, [id]);
	return mood;
}


