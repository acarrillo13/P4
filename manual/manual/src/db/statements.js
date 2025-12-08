const db = require('better-sqlite3')('database.db');

const insertTable = (username, password) => {
    const sql = '
        INSERT INTO users (username, password) VALUES (?, ?)
    '
    db.prepare(sql).run(username, password)
}