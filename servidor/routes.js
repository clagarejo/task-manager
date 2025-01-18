const express = require('express');
const Task = require('./models/Task');
const router = express.Router();

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().lean();
        const formattedTasks = tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        }));
        res.json(formattedTasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

router.post('/tasks', async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const newTask = new Task({ title, description, status });
        await newTask.save();
        res.status(201).json({
            id: newTask._id,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});


router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true } // Retorna la tarea actualizada
        );

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({
            id: task._id, // Transformación de _id a id
            title: task.title,
            description: task.description,
            status: task.status,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});


router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea eliminada', id: task._id }); // Retorna el id eliminado
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});


module.exports = router;
