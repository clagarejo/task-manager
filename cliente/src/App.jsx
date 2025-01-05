import { useState } from "react";
import ErrorNotification from "@/components/errorNotification";
import './app.css';
import Tasks from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/hooks/useTasks";

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, error, handleAddTask, handleDeleteTask, handleUpdateTask } = useTasks();

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const handleAddOrUpdateTask = (task) => {
    if (editingTask) {
      handleUpdateTask({ ...task, id: editingTask.id });
      setEditingTask(null); 
      setNewTitle('');
      setNewDescription('');
    } else {
      handleAddTask(task);
      setNewTitle('');
      setNewDescription('');
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
            {tasks.map(task => (
              <Tasks
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
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
