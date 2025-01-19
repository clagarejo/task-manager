import { useState } from "react";
import RenderColumn from "@/components/RenderColumn";
import { useTaskStore } from "@/store/useTaskStore";

const TaskBoard = () => {
    const { tasks, error, loading, deleteTask } = useTaskStore();
    const [editingTask, setEditingTask] = useState(null);

    return (
        <div className="board">
            <RenderColumn
                title="Reservar"
                tasks={tasks.filter(task => task.status === "Backlog")}
                filterStatus="Backlog"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
            <RenderColumn
                title="Hacer"
                tasks={tasks.filter(task => task.status === "ToDo")}
                filterStatus="ToDo"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
            <RenderColumn
                title="En curso"
                tasks={tasks.filter(task => task.status === "InProgress")}
                filterStatus="InProgress"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
            <RenderColumn
                title="Finalizada"
                tasks={tasks.filter(task => task.status === "Done")}
                filterStatus="Done"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
        </div>
    );
};

export default TaskBoard;
