import Database from 'better-sqlite3';
const db = new Database('users.db');

export const insertUser = (username, password) => {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    return stmt.run(username, password);
};