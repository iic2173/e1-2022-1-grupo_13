import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = function Register() {
  const navigate = useNavigate();
  return (
    <div id="form">
      <div className="center-div">
        <h2>Crear Usuario!</h2>
        <RegisterForm />
        <p>Ya tienes cuenta?</p>
        <Link to="../login">Inicia Sesión</Link>
      </div>

      <div className="center-div">
        <p><button className="boton" type="button" onClick={() => navigate(-1)}>Volver</button></p>
      </div>

    </div>
  );
};

export default Register;