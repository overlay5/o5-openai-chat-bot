import config from './config'
import * as sqlite from 'sqlite3'

const db = new sqlite.Database(config.dbFile)
process.on("exit", () => { db.close() })

db.run(`
  CREATE TABLE IF NOT EXISTS messages (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     message TEXT,
     sender TEXT,
     timestamp INTEGER
  );
  CREATE TABLE IF NOT EXISTS tokens (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     data TEXT
  );
`);

export default db
