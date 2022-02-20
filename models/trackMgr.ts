import dbmgr from './dbMgr'

const db = dbmgr.db

exports.getTracks = () => {
  const sql = 'SELECT * FROM track'
  let stmt = db.prepare(sql)
  let res = stmt.all()
  return res
}


