import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore"; // Importa el store de autenticación
import ErrorNotification from "@/components/ErrorNotification";
import RenderColumn from "@/components/RenderColumn";
import { useTaskStore } from "@/store/useTaskStore";
import "./styles.css";
import LoginRegister from "@/pages";
import { FaSignOutAlt } from 'react-icons/fa';

// Componente para proteger las rutas privadas
function PrivateRoute({ children }) {
  const { status } = useAuthStore();
  if (status === "checking") {
    return <div>Loading...</div>; // Mientras se verifica el token
  }
  if (status === "not-authenticated") {
    return <Navigate to="/" />; // Redirige al login si no está autenticado
  }
  return children;
}


const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/'; 
};

function App() {
  const { tasks, error, fetchTasks, loading, deleteTask } = useTaskStore();
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="tasks-container">
      <div className="header">
        <h1>Task Manager</h1>
        <div className="logout-container" onClick={handleLogout}>
          <FaSignOutAlt size={20} />
        </div>
      </div>
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

export default function MainApp() {
  const { status } = useAuthStore(); // Estado de autenticación

  return (
    <Router>
      <Routes>
        {/* Ruta para el login */}
        <Route path="/" element={<LoginRegister />} />

        {/* Ruta protegida para la página de tareas */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />

        {/* Redirige a la página de tareas si ya está autenticado */}
        <Route path="/home" element={status === "authenticated" ? <Navigate to="/tasks" /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
