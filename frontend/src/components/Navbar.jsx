import React from "react";

function Navbar() {
    return (
        <header>
            <div class="container">
            <div class="logo">
                <a href="Home">Inicio</a>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="Users">Usuarios</a>
                    </li>
                    <li>
                        <a href="Locations">Ubicaciones</a>
                    </li>
                    <li>
                        <a href="SignUp">Registrarse</a>
                    </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}

export default Navbar;