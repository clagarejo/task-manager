import { useState } from "react";
import RenderColumn from "@/components/RenderColumn";
import { useTaskStore } from "@/store/useTaskStore";

const TaskBoard = () => {
    const { tasks, error, loading, deleteTask } = useTaskStore();
    const [editingTask, setEditingTask] = useState(null);

    return (
        <div className="board">
            <RenderColumn
                title="Backlog"
                tasks={tasks.filter(task => task.status === "Backlog")}
                filterStatus="Backlog"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
            <RenderColumn
                title="ToDo"
                tasks={tasks.filter(task => task.status === "ToDo")}
                filterStatus="ToDo"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
            <RenderColumn
                title="In Progress"
                tasks={tasks.filter(task => task.status === "InProgress")}
                filterStatus="InProgress"
                loading={loading}
                deleteTask={deleteTask}
                setEditingTask={setEditingTask}
                editingTask={editingTask}
            />
            <RenderColumn
                title="Done"
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
