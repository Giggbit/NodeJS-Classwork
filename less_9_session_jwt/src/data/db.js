import mysql2 from "mysql2/promise";

export const dbConnection = mysql2.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "jwtdb"
});