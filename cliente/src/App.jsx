import { useState, useEffect } from "react";
import { getTasks, addTask, deleteTask } from "@/services/taskService"; // Importar las funciones del servicio
import './app.css';
import ErrorNotification from "@/components/errorNotification";
import Tasks from "@/components/task";
import TaskForm from "@/components/TaskForm";


function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then(response => setTasks(response.data))
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);

  const handleAddTask = (newTask) => {
    addTask(newTask)
      .then(response => {
        setTasks([response.data, ...tasks]);
        setError("");
      })
      .catch(err => setError("Error al agregar la tarea"));
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => setError("Error al eliminar la tarea"));
  };

  return (
    <div className="tasks-container">
      <section className="form-section">
        <h1>Gestión de tareas</h1>
        {error && <ErrorNotification message={error} />}
        <TaskForm onAddTask={handleAddTask} />
      </section>

      <section className="tasks-section">
        <h2>Tareas</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map(task => (
              <Tasks key={task.id} task={task} handleDeleteTask={handleDeleteTask} />
            ))}
          </ul>
        ) : (
          <p style={{ color: 'red' }}>No hay tareas para mostrar en este momento</p>
        )}
      </section>
    </div>
  );

}

export default App;
