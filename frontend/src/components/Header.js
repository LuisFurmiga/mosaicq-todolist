// frontend/src/components/Header.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/mosaicq_logo.png';

function Header() {
    const location = useLocation();

    // Se estiver no dashboard, os links não serão exibidos
    const isDashboard = location.pathname === "/dashboard";

    // Lista de links de navegação
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/login", label: "Login" },
        { path: "/register", label: "Registrar" }
    ];

    return (
        <header className="header">
            <div className="container">
                <img src={logo} alt="MosaicQ Logo" className="logo" />
                <h1>MosaicQ - To-Do List</h1>
                {!isDashboard && ( // Se NÃO estiver no dashboard, mostra os links
                    <nav>
                        <ul>
                            {navLinks
                                .filter(link => link.path !== location.pathname) // Oculta o link da página atual
                                .map(link => (
                                    <li key={link.path}>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
