import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminSettings from './AdminSettings';
import Seo from '../../components/Seo';

const ADMIN_SESSION_KEY = 'jobrythm_admin_session';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Seo title="Admin" description="Jobrythm admin area." noindex />
        <AdminLogin onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <Seo title="Admin" description="Jobrythm admin area." noindex />
      <Routes>
        <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route index element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="/admin-page" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminPage;
