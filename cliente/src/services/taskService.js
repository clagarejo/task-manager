import axios from 'axios';

const API_URL = "https://server-task.fly.dev/tasks";
// const API_URL = "http://localhost:3000/tasks";

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTask = (task) => axios.put(`${API_URL}/${task.id}`, task);

