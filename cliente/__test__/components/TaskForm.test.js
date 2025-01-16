import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '@/components/TaskForm';
import { useTaskStore } from '@/store/useTaskStore';

// Simulamos el store para que las funciones addTask y updateTask sean mokeadas
jest.mock('@/store/useTaskStore', () => ({
    useTaskStore: jest.fn()
}));

describe('TaskForm', () => {
    let mockAddTask;
    let mockUpdateTask;
    let setEditingTask;

    beforeEach(() => {
        mockAddTask = jest.fn();
        mockUpdateTask = jest.fn();
        useTaskStore.mockReturnValue({
            addTask: mockAddTask,
            updateTask: mockUpdateTask
        });

        setEditingTask = jest.fn();
    });

    test('debe coincidir con el snapshot', () => {
        const { asFragment } = render(<TaskForm editingTask={null} setEditingTask={setEditingTask} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('debe renderizar el formulario correctamente', () => {
        render(<TaskForm editingTask={null} setEditingTask={setEditingTask} />);

        expect(screen.getByPlaceholderText('Título')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Descripción')).toBeInTheDocument();
        expect(screen.getByText('Agregar tarea')).toBeInTheDocument();
    });

    test('debe llamar a addTask con los valores correctos al enviar el formulario', () => {
        render(<TaskForm editingTask={null} setEditingTask={setEditingTask} />);

        fireEvent.change(screen.getByPlaceholderText('Título'), {
            target: { value: 'Nueva tarea' }
        });
        fireEvent.change(screen.getByPlaceholderText('Descripción'), {
            target: { value: 'Descripción de la nueva tarea' }
        });

        fireEvent.submit(screen.getByRole('form'));

        expect(mockAddTask).toHaveBeenCalledWith({
            title: 'Nueva tarea',
            description: 'Descripción de la nueva tarea'
        });
        expect(setEditingTask).toHaveBeenCalledWith('');
    });

    test('no debe llamar a addTask si los campos están vacíos', () => {
        render(<TaskForm editingTask={null} setEditingTask={setEditingTask} />);

        fireEvent.submit(screen.getByRole('form'));

        expect(mockAddTask).not.toHaveBeenCalled();
    });

    test('debe llamar a updateTask con los valores correctos al editar una tarea', () => {
        const editingTask = { id: 1, title: 'Tarea existente', description: 'Descripción de tarea existente' };

        render(<TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />);

        fireEvent.change(screen.getByPlaceholderText('Título'), {
            target: { value: 'Tarea actualizada' }
        });
        fireEvent.change(screen.getByPlaceholderText('Descripción'), {
            target: { value: 'Descripción de tarea actualizada' }
        });

        fireEvent.submit(screen.getByRole('form'));

        expect(mockUpdateTask).toHaveBeenCalledWith({
            id: 1,
            title: 'Tarea actualizada',
            description: 'Descripción de tarea actualizada'
        });
        expect(setEditingTask).toHaveBeenCalledWith('');
    });
});
