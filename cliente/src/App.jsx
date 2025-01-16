import { useState } from "react";
import ErrorNotification from "@/components/ErrorNotification";
import "./styles.css";
import Tasks from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import {useTaskStore} from "@/store/useTaskStore";

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const {
    tasks,
    error,
    addTask,
    deleteTask,
    updateTask,
  } = useTaskStore();

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const handleAddOrUpdateTask = (task) => {
    if (editingTask) {
      updateTask({ ...task, id: editingTask.id });
      setEditingTask(null);
      setNewTitle("");
      setNewDescription("");
    } else {
      addTask(task);
      setNewTitle("");
      setNewDescription("");
    }
  };

  return (
    <div className="tasks-container">
      <section className="form-section">
        <h1>Gestión de tareas</h1>
        <TaskForm
          handleAddOrUpdateTask={handleAddOrUpdateTask}
          editingTask={editingTask}
          newTitle={newTitle}
          newDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
        {error && <ErrorNotification message={error} />}
      </section>

      <section className="tasks-section">
        <h2>Tareas</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <Tasks
                key={task.id}
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
