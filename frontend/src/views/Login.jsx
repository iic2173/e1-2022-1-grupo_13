import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const initialValues = {
  email: '',
  password: '',
};

const Login = function Login() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const user = await response.json();
      handleUserLogin(user);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (currentUser) return <Navigate to="/" />;

  return (
    <div id="form">
      <div className="center-div">
        <h2>Ingresa con tu cuenta</h2>
        <div className="register-box">
          <form onSubmit={handleSubmit}>
            <div className="form-label">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-label">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-label">
              <button className="boton" type="submit" disabled={!(values.email && values.password)}>Iniciar Sesión</button>
            </div>
          </form>
        </div>
        <p>No tienes cuenta?</p>
        <Link to="../register">Create Una!</Link>
      </div>

      <p>{errorMessage}</p>
      <div id="form">
        <div className="center-div">
          <p><button className="boton" type="button" onClick={() => navigate(-1)}>Volver</button></p>
        </div>
      </div>

    </div>

  );
};

export default Login;