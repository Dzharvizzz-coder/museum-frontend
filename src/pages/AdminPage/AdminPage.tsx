import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.scss';
import Logo from '../../components/Logo/Logo';

const AdminPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (login === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');

      navigate('/admin/events');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Музей Истории Екатеринбурга</h1>
        <Logo />
      </header>
      <div className="auth-container">
        <h2>Авторизация</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="login">Логин</label>
            <input
              type="text"
              id="login"
              placeholder="Введите логин"
              className="auth-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Введите пароль"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;