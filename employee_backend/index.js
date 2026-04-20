const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Nanobotai@2346',
  database: 'employee_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employee');
  res.json(rows);
});

// Get employee by id
app.get('/api/employees/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
  res.json(rows[0]);
});

// Add new employee
app.post('/api/employees', async (req, res) => {
  const { name, department, role } = req.body;
  if (!name || !department || !role) return res.status(400).json({ error: 'Missing fields' });
  const [result] = await pool.query('INSERT INTO employee (name, department, role) VALUES (?, ?, ?)', [name, department, role]);
  res.status(201).json({ id: result.insertId, name, department, role });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
