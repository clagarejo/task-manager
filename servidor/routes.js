const express = require('express');
const router = express.Router();

let tasks = [
    { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1' },
    { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2' },
];

router.get('/tasks', (req, res) => {
    res.json(tasks);
});

router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Verificar si la tarea existe
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    // Validar que ambos campos existan
    if (!title || !description) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Actualizar la tarea
    tasks[taskIndex] = { id: parseInt(id), title, description };

    // Responder con la tarea actualizada
    res.json(tasks[taskIndex]);
});

router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;
