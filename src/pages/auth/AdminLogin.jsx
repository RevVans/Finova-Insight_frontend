import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        
        // Enforce admin credentials
        if (email === 'admin@finova.com' && password === 'password') {
            navigate('/admin/dashboard');
        } else {
            setError('Email atau password admin salah!');
        }
    };

    return (
        <div className="min-h-screen bg-[#E5F3EE] flex items-center justify-center relative p-4">
            {/* Bottom Left Shield Icon */}
            <div className="absolute bottom-8 left-8 text-black">
                <MdAdminPanelSettings className="w-12 h-12" />
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-10 w-full max-w-[450px]">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/Logo/Frame 57.png" alt="Finova Insight" className="h-16 object-contain" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-black mb-8 tracking-wide">LOGIN ADMIN</h2>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="admin@finova.com" 
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <input 
                        type="password" 
                        placeholder="password" 
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full mb-2 font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button 
                        type="submit" 
                        className="bg-[#1C1B1F] text-white font-medium px-4 py-3 rounded-md hover:bg-black transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
