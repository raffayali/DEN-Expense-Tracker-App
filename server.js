const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expense_tracker'
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to database');
});


app.get('/budgets', (req, res) => {
    const sql = 'SELECT * FROM budgets';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


app.post('/budgets', (req, res) => {
    const budgets = req.body; // Expect an array of budgets
    const values = budgets.map(budget => [budget.amount, budget.category]);

    const sql = 'INSERT INTO budgets (amount, category) VALUES ?';
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Budgets added successfully', result });
    });
});

app.delete('/budgets/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM budgets WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Failed to delete budget. Database error.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        res.status(204).send(); // No content to send back
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
