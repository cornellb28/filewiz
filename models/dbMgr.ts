import Database from "better-sqlite3-with-prebuilds";
import path from "path";

export const db = new Database(path.join(__dirname, "../database/database.db"));

export default db;
