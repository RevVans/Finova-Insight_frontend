import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you would normally add authentication logic for admin
        // For now, we simulate a successful login and navigate to the dashboard
        navigate('/');
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

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="admin username" 
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
