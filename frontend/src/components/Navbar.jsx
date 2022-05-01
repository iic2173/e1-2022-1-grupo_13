import React from "react";
import { Link } from 'react-router-dom';

function Navbar() {
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
                    <li>
                        <Link to='/signup'>Registrarse</Link>
                    </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Navbar;