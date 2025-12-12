import express from 'express';
import sqlite3Module from 'sqlite3';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3Module.verbose();

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) console.error('Failed to open DB', err);
    else console.log('Connected to SQLite DB:', dbFile);
});

//tables for users and posts
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        text TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

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

app.get('/posts', (req, res) => {
    const query = `SELECT posts.id, posts.text, posts.user_id, users.username, posts.created_at
        FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(rows);
    });
});

app.post('/posts', (req, res) => {
    const { user_id, text } = req.body;
    if (!user_id || !text) return res.status(400).json({ message: 'Missing user_id or text' });
    const stmt = 'INSERT INTO posts (user_id, text) VALUES (?, ?)';
    db.run(stmt, [user_id, text], function (err) {
        if (err) return res.status(500).json({ message: err.message });
        db.get('SELECT posts.id, posts.text, posts.user_id, users.username, posts.created_at FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?', [this.lastID], (e, row) => {
            if (e) return res.status(500).json({ message: e.message });
            res.status(201).json(row);
        });
    });
});

app.delete('/posts/:id/:userId?', (req, res) => {
    const { id, userId } = req.params;
    const userIdBody = req.body.user_id;
    const owner = userId || userIdBody;
    if (!owner) return res.status(400).json({ message: 'Missing user id' });

    db.run('DELETE FROM posts WHERE id = ? AND user_id = ?', [id, owner], function (err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) return res.status(403).json({ message: 'Not allowed or not found' });
        res.json({ message: 'deleted' });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});