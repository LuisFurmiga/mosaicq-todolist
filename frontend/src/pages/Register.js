// frontend/src/pages/Register.js

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const schema = yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Email inválido').required('O email é obrigatório'),
    confirmEmail: yup.string().oneOf([yup.ref('email'), null], 'Os emails não coincidem').required('Confirmação de email é obrigatória'),
    senha: yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .matches(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)')
        .required('A senha é obrigatória'),
    confirmSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senhas não coincidem').required('Confirmação de senha é obrigatória')
});

function Register() {
    const { handleRegister } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [passwordValidations, setPasswordValidations] = useState({
        minLength: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    const password = watch('senha', '');

    const validatePassword = (password) => {
        setPasswordValidations({
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[@$!%*?&]/.test(password)
        });
    };

    const onSubmit = async (data) => {
        setErrorMessage('');
        setSuccessMessage('');
        try {
            await handleRegister({ 
                nome: data.nome, 
                email: data.email, 
                senha: data.senha 
            });
            setSuccessMessage('Cadastro realizado com sucesso! Você pode fazer login agora.');
            setTimeout(() => {
                navigate('/login');
            }, 3000); // 3 segundos (3000ms)
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.error || 'Ocorreu um erro ao registrar.');
            } else {
                setErrorMessage('Email já cadastrado!');
            }
        }
    }; 

    return (
        <div className="register-container">
            <h2>Registrar</h2>

            {errorMessage && <p className="error-box">{errorMessage}</p>}
            {successMessage && <p className="success-box">{successMessage}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('nome')} type="text" placeholder="Nome" />
                <p className="error-message">{errors.nome?.message}</p>

                <input {...register('email')} type="email" placeholder="Email" />
                <p className="error-message">{errors.email?.message}</p>

                <input {...register('confirmEmail')} type="email" placeholder="Confirme seu email" />
                <p className="error-message">{errors.confirmEmail?.message}</p>

                <input 
                    {...register('senha')} 
                    type="password" 
                    placeholder="Senha" 
                    onChange={(e) => validatePassword(e.target.value)}
                />
                <p className="error-message">{errors.senha?.message}</p>

                {/* Lista de requisitos da senha */}
                <ul className="password-requirements">
                    <li className={passwordValidations.minLength ? "valid" : "invalid"}>
                        ✔ Pelo menos 8 caracteres
                    </li>
                    <li className={passwordValidations.hasUpperCase ? "valid" : "invalid"}>
                        ✔ Pelo menos 1 letra maiúscula
                    </li>
                    <li className={passwordValidations.hasNumber ? "valid" : "invalid"}>
                        ✔ Pelo menos 1 número
                    </li>
                    <li className={passwordValidations.hasSpecialChar ? "valid" : "invalid"}>
                        ✔ Pelo menos 1 caractere especial (@, $, !, %, *, ?, &)
                    </li>
                </ul>

                <input {...register('confirmSenha')} type="password" placeholder="Confirme sua senha" />
                <p className="error-message">{errors.confirmSenha?.message}</p>

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Register;
