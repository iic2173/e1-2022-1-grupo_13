import React from "react";
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

function Navbar() {
    const { currentUser, handleUserLogout } = useAuth();
    return (
        <header>
            <div class="container">
            <div class="logo">
                <Link to='/'>Inicio</Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/users'>Usuarios</Link>
                    </li>
                    <li>
                        <Link to='/positions'>Ubicaciones</Link>
                    </li>
                    <li id="derecha">
            {currentUser ? (

              <Link to="/" onClick={handleUserLogout}> Cerrar Sesión</Link>
            // crear boton Mi Perfil
            ) : (
              <Link to="login">Iniciar Sesión</Link>
            )}
          </li>
          <li id="derecha">
            {currentUser ? (

              <Link to="/profile">
                <i className="far fa-user" />
                {' '}
                Mi Perfil
              </Link>

            ) : (

              <Link to="register">Registrarse</Link>
            )}
          </li>
          <li id="derecha">
            {currentUser ? (

              <Link to="/images">
                <i className="far fa-user" />
                {' '}
                Agregar fotos
              </Link>

            ) : (

              <p></p>
            )}
          </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Navbar;