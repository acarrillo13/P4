const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const dbFile = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) console.error('Failed to open DB', err);
    else console.log('Connected to SQLite DB:', dbFile);
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT id, username FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!row) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ message: 'Login successful', user: row });
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const stmt = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(stmt, [username, password], function (err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(409).json({ message: 'Username already exists' });
            }
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: this.lastID, username });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});