// routes.js
const express = require('express');
const router = express.Router();

let tasks = [
    { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1' },
    { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2' }
];

// Ruta para obtener todas las tareas
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Ruta para crear una nueva tarea
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Ruta para eliminar una tarea
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;
