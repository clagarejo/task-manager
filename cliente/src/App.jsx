import { useEffect, useState } from "react";
import ErrorNotification from "@/components/ErrorNotification";
import RenderColumn from "@/components/RenderColumn"; 
import { useTaskStore } from "@/store/useTaskStore";
import "./styles.css";

function App() {
  const { tasks, error, fetchTasks, loading, deleteTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="tasks-container">
      <h1>Task Manager</h1>
      {error && <ErrorNotification message={error} />}

      <div className="board">
        <RenderColumn
          title="Backlog"
          tasks={tasks}
          filterStatus="Backlog"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
        <RenderColumn
          title="To Do"
          tasks={tasks}
          filterStatus="ToDo"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
        <RenderColumn
          title="In Progress"
          tasks={tasks}
          filterStatus="InProgress"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
        <RenderColumn
          title="Done"
          tasks={tasks}
          filterStatus="Done"
          loading={loading}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
      </div>
    </div>
  );
}

export default App;
