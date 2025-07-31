// index.js
const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
      );
    `);
    console.log('Table created successfully');
    const res = await pool.query('SELECT * FROM users');
    console.log('Current users:', res.rows);
  } catch (err) {
    console.error('Error creating table:', err);
  }
})();

app.use('/users', require('./routes/user'));

app.listen(3000, () => console.log('Server running on port 3000'));
