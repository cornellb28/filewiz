import db from "./dbMgr";

const getTracks = () => {
  const sql = "SELECT * FROM track";
  let stmt = db.prepare(sql);
  let res = stmt.all();
  return res;
};

export = { getTracks };
