// frontend/src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Bem-vindo ao MosaicQ To-Do List</h1>
            <p>Gerencie suas tarefas de forma eficiente.</p>
            <div className="home-buttons">
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Registrar</Link>
            </div>
        </div>
    );
}

export default Home;
