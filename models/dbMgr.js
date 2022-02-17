const path = require('path')
const Database = require('better-sqlite3-with-prebuilds')
const db = new Database(path.join(__dirname, '../database/database.db'))
exports.db = db


