import React from 'react';  // Asegúrate de agregar esta importación
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RenderColumn from '../../src/components/RenderColumn';
import { useModal } from '@/hooks/useModal';
import { useTaskActions } from '@/hooks/useTaskActions';

// Mock de los hooks personalizados
jest.mock('@/hooks/useModal', () => ({
    useModal: jest.fn(),
}));

jest.mock('@/hooks/useTaskActions', () => ({
    useTaskActions: jest.fn(),
}));

describe('Componente RenderColumn', () => {
    const mockTasks = [
        { id: 1, title: 'Tarea 1', description: 'Descripción 1', status: 'Done' },
        { id: 2, title: 'Tarea 2', description: 'Descripción 2', status: 'Backlog' },
    ];

    const mockDeleteTask = jest.fn();

    beforeEach(() => {
        useModal.mockReturnValue({
            isModalOpen: false,
            taskToEdit: null,
            currentStatus: 'Done',
            openModalForNewTask: jest.fn(),
            openModalForEditTask: jest.fn(),
            closeModal: jest.fn(),
        });

        useTaskActions.mockReturnValue({
            saveTask: jest.fn(),
        });
    });

    it('debería llamar a openModalForNewTask cuando se hace clic en el botón de agregar tarea', () => {
        const openModalForNewTask = jest.fn();
        useModal.mockReturnValue({
            ...useModal(),
            openModalForNewTask,
        });

        render(
            <RenderColumn
                title="Columna de Tareas"
                tasks={mockTasks}
                filterStatus="Done"
                loading={false}
                deleteTask={mockDeleteTask}
            />
        );

        fireEvent.click(screen.getByText('Agregar nueva tarea'));

        expect(openModalForNewTask).toHaveBeenCalledTimes(1);
    });

    it('debería llamar a openModalForNewTask cuando se hace clic en el botón de agregar tarea', () => {
        const openModalForNewTask = jest.fn();
        useModal.mockReturnValue({
            ...useModal(),
            openModalForNewTask,
        });

        render(
            <RenderColumn
                title="Columna de Tareas"
                tasks={mockTasks}
                filterStatus="Done"
                loading={false}
                deleteTask={mockDeleteTask}
            />
        );

        fireEvent.click(screen.getByText('Agregar nueva tarea'));

        // Verificar que la función openModalForNewTask fue llamada
        expect(openModalForNewTask).toHaveBeenCalledTimes(1);
    });
});
