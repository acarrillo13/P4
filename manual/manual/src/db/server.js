const express =require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const { use } = require("react");

const app =express();
app.use(express.json());
app.use(cors());

const db =new sqlite3.Database("./users.db");
app.post("/login", (req, res) => {
    const { username, password } =req.body;
    const query ="SELECT * FROM users WHERE username = ? AND password = ?";

    db.get(query, [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ message: err.message });

        if (!row) {
            return res.status(401).json({ message: "Invalid credentials" });        
        }
        res.json({ message: "Login successful", user: row });
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});