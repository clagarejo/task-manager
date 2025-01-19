import React from 'react';
import PropTypes from 'prop-types';
import Task from '@/components/Task';

const TaskList = ({ tasks, handleEditTask, loading, filterStatus }) => {
    const filteredTasks = tasks
        .filter((task) => task.status === filterStatus)
        .map((task) => ({
            ...task,
            id: task.id || task._id,
        }));

    return (
        <section>
            {loading ? (
                <p>Cargando...</p>
            ) : filteredTasks.length > 0 ? (
                <ul>
                    {filteredTasks.map((task, index) => (
                        <Task key={task.id || index} task={task} handleEditTask={handleEditTask} />
                    ))}
                </ul>
            ) : null}
        </section>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    handleEditTask: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    filterStatus: PropTypes.string.isRequired,
};

export default TaskList;
