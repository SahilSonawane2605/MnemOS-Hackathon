const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT,
      title TEXT,
      topic TEXT,
      skill TEXT,
      source TEXT,
      timestamp TEXT,
      duration_seconds INTEGER
    )
  `);

});

module.exports = db;