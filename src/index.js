const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const app_port = process.env.APP_PORT;

// Database connection settings
const host = process.env.MYSQL_HOST;
const db_name = process.env.MYSQL_DATABASE_NAME;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const db_port = process.env.MYSQL_PORT;

// Create a MYSQL connection pool
const pool = mysql.createPool({
    host: host,
    user: username,
    password: password,
    database: db_name,
    port: db_port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Serve static files (like index.html)
app.use(express.static(__dirname));

// API endpoint to get contacts as JSON
app.get('/contacts', (req, res) => {
    const sql = 'SELECT first_name, last_name, company, email, phone, address, city, state, zip_code, notes FROM contacts';
    pool.query(sql, (err, results) => {
        if (err) {
            console.log('Query error: ', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Keeps the server listening to port 3000
app.listen(app_port, () => {
  console.log(`🚀 Server running at http://localhost:${app_port}`);
});