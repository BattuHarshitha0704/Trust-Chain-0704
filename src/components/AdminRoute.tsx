
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
