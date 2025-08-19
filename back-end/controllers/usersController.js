const db = require('../models/db.js');

async function getUsers(req, res){
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function postUser(req, res){
    try {
        const {name, avatar, money} = req.body;
        const [result] = await db.query(
            'INSERT INTO users(user_name, avatar, money) VALUES(?, ?, ?);',
            [name, avatar, money]
        );
        res.json({id: result.insertId, name, avatar, money});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function deleteUser(req, res){
    try {
        const {id} = req.params;
        const [result] = await db.query(
            'DELETE FROM users WHERE user_id = ?;',
            [id]
        );
        res.json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUsers, postUser, deleteUser };