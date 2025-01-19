import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

import './styles.css';

function LoginRegister() {
    const { startLogin, startRegister, errorMessage, status } = useAuthStore();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await startLogin({ email: loginEmail, password: loginPassword });
        navigate("/tasks");
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        await startRegister({ name: registerName, email: registerEmail, password: registerPassword });
        navigate("/tasks");
    };

    return (
        <div className="container">
            <div className="form-container">
                {/* Login Section */}
                <div className="form-section login-section">
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label htmlFor="login-email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="login-email"
                                placeholder="Ingresa tu correo"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Contraseña</label>
                            <input
                                type="password"
                                id="login-password"
                                placeholder="Ingresa tu contraseña"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn" disabled={status === 'checking'}>
                            {status === 'checking' ? 'Cargando...' : 'Iniciar sesión'}
                        </button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>

                {/* Register Section */}
                <div className="form-section register-section">
                    <h2>Crear cuenta</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <label htmlFor="register-name">Nombre</label>
                            <input
                                type="text"
                                id="register-name"
                                placeholder="Ingresa tu nombre"
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="register-email"
                                placeholder="Ingresa tu correo"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register-password">Contraseña</label>
                            <input
                                type="password"
                                id="register-password"
                                placeholder="Crea una contraseña"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn" disabled={status === 'checking'}>
                            {status === 'checking' ? 'Cargando...' : 'Crear cuenta'}
                        </button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
