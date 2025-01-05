import { useState, useEffect } from "react";
import { getTasks, addTask, deleteTask, updateTask } from "@/services/taskService";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getTasks()
            .then(response => setTasks(response.data))
            .catch(err => setError("Error al obtener las tareas"));
    }, []);

    const handleAddTask = (newTask) => {
        if (!newTask.title || !newTask.description) {
            setError("Todos los campos son requeridos");
            return;
        }

        addTask(newTask)
            .then(response => {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setError("");
            })
            .catch(() => setError("Error al agregar la tarea"));
    };

    const handleDeleteTask = (id) => {
        deleteTask(id)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            })
            .catch(() => setError("Error al eliminar la tarea"));
    };

    const handleUpdateTask = (updatedTask) => {
        if (!updatedTask.title || !updatedTask.description) {
            setError("Todos los campos son requeridos");
            return;
        }

        updateTask(updatedTask)
            .then(response => {
                setTasks(prevTasks =>
                    prevTasks.map(task => (task.id === updatedTask.id ? response.data : task))
                );
                setError("");
            })
            .catch(() => setError("Error al actualizar la tarea"));
    };

    return {
        tasks,
        error,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
    };
};
