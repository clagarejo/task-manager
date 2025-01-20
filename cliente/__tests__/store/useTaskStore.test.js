import { useTaskStore } from '@/store/useTaskStore';
import taskApi from '@/api/taskApi';
import { useAuthStore } from '@/store/useAuthStore';

jest.mock('@/api/taskApi', () => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
}));

describe('useTaskStore', () => {
    let userId;

    beforeEach(() => {
        userId = '123';
        useAuthStore.setState({ user: { uid: userId, token: 'fake-token' } });
        jest.clearAllMocks();
    });

    test('fetchTasks debe cargar tareas correctamente', async () => {
        const tasksData = [{ id: 1, title: 'Task 1', description: 'Description' }];
        taskApi.get.mockResolvedValue({ data: tasksData });
        useTaskStore.setState({ tasks: [] });
        await useTaskStore.getState().fetchTasks(userId);
        expect(useTaskStore.getState().tasks).toEqual(tasksData);
    });

    test('fetchTasks debe manejar error al cargar tareas', async () => {
        taskApi.get.mockRejectedValue(new Error('Error'));
        useTaskStore.setState({ tasks: [] });
        await useTaskStore.getState().fetchTasks(userId);
        expect(useTaskStore.getState().tasks).toEqual([]);
    });

    test('addTask debe agregar una tarea correctamente', async () => {
        const taskResponse = { id: 2, title: 'New Task', description: 'Description' };
        const newTask = { title: 'New Task', description: 'Description' };
        taskApi.post.mockResolvedValue({ data: taskResponse });
        await useTaskStore.getState().addTask(newTask, userId);
        expect(useTaskStore.getState().tasks).toContainEqual(taskResponse);
    });

    test('updateTask debe actualizar una tarea correctamente', async () => {
        const initialTask = { id: 1, title: 'Task 1', description: 'Description' };
        const updatedTask = { id: 1, title: 'Updated Task', description: 'Updated description', status: 'Done' };
        useTaskStore.setState({ tasks: [initialTask] });
        taskApi.put.mockResolvedValue({ data: updatedTask });
        await useTaskStore.getState().updateTask(updatedTask, userId);
        expect(useTaskStore.getState().tasks).toContainEqual(updatedTask);
    });

    test('deleteTask debe eliminar una tarea correctamente', async () => {
        const taskId = 1;
        const taskToDelete = { id: taskId, title: 'Task 1', description: 'Description' };
        useTaskStore.setState({ tasks: [taskToDelete] });
        taskApi.delete.mockResolvedValue({});
        await useTaskStore.getState().deleteTask(taskId, userId);
        expect(useTaskStore.getState().tasks).not.toContainEqual(taskToDelete);
    });

    test('deleteTask debe manejar error al eliminar una tarea', async () => {
        const taskId = 1;
        const taskToDelete = { id: taskId, title: 'Task 1', description: 'Description' };
        useTaskStore.setState({ tasks: [taskToDelete] });
        taskApi.delete.mockRejectedValue(new Error('Error'));
        await useTaskStore.getState().deleteTask(taskId, userId);
        expect(useTaskStore.getState().tasks).toContainEqual(taskToDelete);
    });

});
