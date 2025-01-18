const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/task');

const router = express.Router();

// Rutas corregidas, ya no es necesario `/tasks`
router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
