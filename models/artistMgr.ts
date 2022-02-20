import db from "./dbMgr.js";

const getNames = () => {
  const sql = "SELECT * FROM Artist";
  return db.prepare(sql).all();
};

const addArtist = (name: string) => {
  const insertFile = db
    .prepare("INSERT INTO artist (name) VALUES (@name)")
    .run({ name });
};

export = { getNames, addArtist };
