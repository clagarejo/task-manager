import './styles.css';

function Tasks({ task }) {
    return (
        <li className="task-card">
            <div>
                <strong>{task.title}</strong>:
                 <p>{task.description}</p>
            </div>
        </li>
    );
}

export default Tasks;
