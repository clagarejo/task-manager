// services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

// Obtener todas las tareas
export const getTasks = () => {
    return axios.get(API_URL);
};

// Agregar una nueva tarea
export const addTask = (newTask) => {
    return axios.post(API_URL, newTask);
};

// Eliminar una tarea
export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
