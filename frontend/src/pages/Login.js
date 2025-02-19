// frontend/src/pages/Login.js
import './Login.css';

import { useForm } from 'react-hook-form';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from '../context/AuthContext';

import api from '../services/api';
import { jwtDecode } from "jwt-decode";


const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('O email é obrigatório'),
    senha: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória')
});

function Login() {
    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const { email, senha } = data;
            const response = await api.post('/login', { email, senha });
            const { token } = response.data;
            localStorage.setItem("token", token);
            const decoded = jwtDecode(token);
            setUser({ email: decoded.email });
            api.defaults.headers.Authorization = `Bearer ${token}`;
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Credenciais inválidas!");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} type="email" placeholder="Email" />
                <p className="error-message">{errors.email?.message}</p>

                <input {...register('senha')} type="password" placeholder="Senha" />
                <p className="error-message">{errors.senha?.message}</p>

                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
