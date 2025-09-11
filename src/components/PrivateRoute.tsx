import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}


