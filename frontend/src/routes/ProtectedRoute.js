// frontend/src/routes/ProtectedRoute.js

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard"); // Se estiver logado, redireciona para o Dashboard
        }
    }, [user, navigate]);

    return user ? null : children; // Se estiver logado, não renderiza nada
};

export default ProtectedRoute;
