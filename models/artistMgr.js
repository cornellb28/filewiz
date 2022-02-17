
const dbmgr = require('./dbMgr')

const db = dbmgr.db

exports.getNames = () => {
  const sql = 'SELECT * FROM Artist'
  return db.prepare(sql).all()
}

exports.addArtist = (name) => {
  const insertFile = db
    .prepare('INSERT INTO artist (name) VALUES (@name)')
    .run({ name })
}

