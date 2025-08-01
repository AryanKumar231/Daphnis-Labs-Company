import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === null) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
