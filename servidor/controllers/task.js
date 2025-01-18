const Task = require('../models/Task');

// Obtener todas las tareas
const getTasks = async (req, res) => {
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
        res.status(500).json({ ok: false, msg: 'Error al obtener las tareas' });
    }
};

// Crear una nueva tarea
const addTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ ok: false, msg: 'Todos los campos son requeridos' });
    }

    try {
        const newTask = new Task({ title, description, status });
        await newTask.save();
        res.status(201).json({
            ok: true,
            id: newTask._id,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al crear la tarea' });
    }
};

// Actualizar una tarea existente
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true } // Retorna la tarea actualizada
        );

        if (!task) {
            return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
        }

        res.json({
            ok: true,
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al actualizar la tarea' });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ ok: false, msg: 'Tarea no encontrada' });
        }

        res.json({ ok: true, msg: 'Tarea eliminada', id: task._id }); // Retorna el id eliminado
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al eliminar la tarea' });
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};
