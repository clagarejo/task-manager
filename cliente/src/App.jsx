import { useEffect, useState } from "react";
import ErrorNotification from "@/components/ErrorNotification";
import Tasks from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import {useTaskStore} from "@/store/useTaskStore";
import "./styles.css";

function App() {
  const { tasks, error, fetchTasks, deleteTask, loading } = useTaskStore(); 
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  return (
    <div className="tasks-container">
      <section className="form-section">
        <h1>Gestión de tareas</h1>
        <TaskForm
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
        {error && <ErrorNotification message={error} />}
      </section>

      <section className="tasks-section">
        <h2>Tareas</h2>
        {loading ? (
          <p>Cargando tareas...</p>
        ) : tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <Tasks
                key={`${task.id}-${index}`} 
                task={task}
                handleDeleteTask={deleteTask} 
                handleEditTask={handleEditTask}
              />
            ))}
          </ul>
        ) : (
          <p>No hay tareas para mostrar en este momento</p>
        )}
      </section>
    </div>
  );
}

export default App;
