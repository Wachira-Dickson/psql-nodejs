const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE
router.post('/create', async (req, res) => {
    const {name, email} = req.body;
    try {
        const newUser = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        console.log('User added:', newUser.rows[0]);
        res.json(newUser.rows[0]);
    }catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// READ
router.get('/fetch', async (req, res)=> {
    try {
        const users = await pool.query('SELECT * FROM users');
        console.log('Users retrieved:', users.rows);
        res.json(users.rows);
    }catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// UPDATE
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await pool.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        console.log('User updated:', updatedUser.rows[0]);
        res.json(updatedUser.rows[0]);
    }catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// DELETE
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        );
        console.log('User deleted:', deletedUser.rows[0]);
        res.json(deletedUser.rows[0]);
    }catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;

