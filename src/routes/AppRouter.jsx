import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';

export default function AppRouter() {
    return (
        <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            {/*<Route path="/register" element={<Register />} />*/}

            {/* Main Application Routes */}
            <Route path="/" element={<Dashboard />} />

            {/* Fallback route for 404 Not Found */}
            <Route path="*" element={<div className="p-10 text-center text-xl">404 - Page Not Found, Baka!</div>} />
        </Routes>
    )
}