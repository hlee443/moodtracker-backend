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
       namedPlaceholders: true
};

const database = mysql.createPool(dbConfig).promise();
export default database;