import { useAuthStore } from '@/store/useAuthStore';
import taskApi from '@/api/taskApi';
import Swal from 'sweetalert2';

jest.mock('@/api/taskApi', () => ({
    post: jest.fn(),
    get: jest.fn(),
}));

jest.mock('sweetalert2');

// Mock de localStorage
beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            setItem: jest.fn(),
            getItem: jest.fn(),
            clear: jest.fn(),
        },
        writable: true,
    });
});

// Mock de Swal
beforeEach(() => {
    Swal.fire = jest.fn(); // Esto asegura que Swal.fire está mockeado
});

describe('Auth Store', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('startLogin debe iniciar sesión correctamente', async () => {
        const loginData = { email: 'test@example.com', password: 'password' };
        const mockResponse = { data: { token: 'fake-token', name: 'John Doe', uid: '123' } };

        taskApi.post.mockResolvedValue(mockResponse);

        const set = useAuthStore.getState().startLogin;

        await set(loginData);

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        expect(useAuthStore.getState().status).toBe('authenticated');
        expect(useAuthStore.getState().user).toEqual({ name: 'John Doe', uid: '123' });
    });

    test('startLogin debe manejar error de credenciales incorrectas', async () => {
        const loginData = { email: 'test@example.com', password: 'password' };
        taskApi.post.mockRejectedValueOnce(new Error('Credenciales incorrectas'));

        const set = useAuthStore.getState().startLogin;

        await set(loginData);

        expect(useAuthStore.getState().status).toBe('not-authenticated');
        expect(useAuthStore.getState().errorMessage).toBe('Credenciales incorrectas');
        expect(Swal.fire).toHaveBeenCalledWith({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciales incorrectas',
        });
    });

    test('startRegister debe registrar un nuevo usuario correctamente', async () => {
        const registerData = { name: 'John Doe', email: 'john@example.com', password: 'password' };
        const mockResponse = { data: { token: 'fake-token', name: 'John Doe', uid: '123' } };

        taskApi.post.mockResolvedValue(mockResponse);

        const set = useAuthStore.getState().startRegister;

        await set(registerData);

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        expect(useAuthStore.getState().status).toBe('authenticated');
        expect(useAuthStore.getState().user).toEqual({ name: 'John Doe', uid: '123' });
    });

    test('startLogout debe cerrar sesión correctamente', () => {
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('token-init-date', new Date().getTime());
        useAuthStore.getState().startLogout();

        expect(localStorage.clear).toHaveBeenCalled();
        expect(useAuthStore.getState().status).toBe('not-authenticated');
        expect(useAuthStore.getState().user).toBeNull();
        expect(useAuthStore.getState().errorMessage).toBeNull();
    });
});
