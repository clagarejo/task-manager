import { useEffect, useState } from "react";
import ErrorNotification from "@/components/ErrorNotification";
import TaskForm from "@/components/TaskForm";
import RenderColumn from "@/components/RenderColumn"; // Componente separado
import { useTaskStore } from "@/store/useTaskStore";
import "./styles.css";

function App() {
  const { tasks, error, fetchTasks, addTask, loading, deleteTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = (status) => {
    const title = prompt("Enter the title of the new task:");
    const description = prompt("Enter the description of the new task:");

    if (title && description) {
      addTask({ title, description, status });
    } else {
      alert("Both title and description are required to create a new task.");
    }
  };

  return (
    <div className="tasks-container">
      <h1>Task Manager</h1>
      {error && <ErrorNotification message={error} />}

      <div className="board">
        <RenderColumn
          title="Backlog"
          tasks={tasks}
          filterStatus="backlog"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          onAddTask={() => handleAddTask("backlog")}
        />
        <RenderColumn
          title="To Do"
          tasks={tasks}
          filterStatus="todo"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          onAddTask={() => handleAddTask("todo")}
        />
        <RenderColumn
          title="In Progress"
          tasks={tasks}
          filterStatus="inprogress"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          onAddTask={() => handleAddTask("inprogress")}
        />
        <RenderColumn
          title="Done"
          tasks={tasks}
          filterStatus="done"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          onAddTask={() => handleAddTask("done")}
        />
      </div>
    </div>
  );
}

export default App;
