import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import AdminLogin from '../pages/auth/AdminLogin';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Keuangan from '../pages/transactions/Keuangan';
import Investasi from '../pages/investments/Investasi';
import Tabungan from '../pages/savings/Tabungan';
import Aset from '../pages/assets/Aset';

export default function AppRouter() {
    return (
        <Routes>
            {/* Public Authentication Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:token" element={<ResetPassword />} />

            {/* Main Application Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/keuangan" element={<Keuangan />} />
            <Route path="/investasi" element={<Investasi />} />
            <Route path="/tabungan" element={<Tabungan />} />
            <Route path="/aset" element={<Aset />} />

            {/* Fallback route for 404 Not Found */}
            <Route path="*" element={<div className="p-10 text-center text-xl">404 - Page Not Found, Baka!</div>} />
        </Routes>
    )
}