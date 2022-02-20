import Database from "better-sqlite3-with-prebuilds";
import { join } from "path";

export const db = new Database(join("../database/database.db"));

export default db;
