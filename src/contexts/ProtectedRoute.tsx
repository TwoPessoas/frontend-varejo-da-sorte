import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Se não estiver autenticado, redireciona para a página inicial
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;