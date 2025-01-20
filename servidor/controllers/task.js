const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const { userId } = req.query; 

    try {
        const tasks = await Task.find({ userId }).lean(); 
        const formattedTasks = tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        }));
        res.json(formattedTasks);
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error al obtener las tareas' });
    }
};

const addTask = async (req, res) => {
    const { title, description, status, userId } = req.body; 

    if (!title || !description || !status || !userId) {
        return res.status(400).json({ ok: false, msg: 'Todos los campos son requeridos' });
    }

    try {
        const newTask = new Task({ title, description, status, userId });
        await newTask.save();

        res.status(201).json({
            ok: true,
            id: newTask._id,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error al crear la tarea' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, userId } = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId },
            { title, description, status },
            { new: true } 
        );

        if (!task) {
            return res.status(404).json({ ok: false, msg: 'Tarea no encontrada o no autorizada' });
        }

        res.json({
            ok: true,
            id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error al actualizar la tarea' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const task = await Task.findOneAndDelete({ _id: id, userId });

        if (!task) {
            return res.status(404).json({ ok: false, msg: 'Tarea no encontrada o no autorizada' });
        }

        res.json({ ok: true, msg: 'Tarea eliminada', id: task._id });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Error al eliminar la tarea' });
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};
