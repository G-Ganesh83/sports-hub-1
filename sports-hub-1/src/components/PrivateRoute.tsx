import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return <Navigate to="/auth?mode=login" replace state={{ from: window.location.pathname }} />;
  }
  return <Outlet />;
}


