import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });

            localStorage.setItem('auth_token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log("Login successful!");
            
            // Send them through the Unified Door!
            if (response.data.user.role === 'admin') navigate('/admin-dashboard');
            else navigate('/dashboard');

        } catch (error) {
            console.error("Login failed!", error);
        }
    
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
                <h2 className="text-2xl font-bold text-center text-black mb-8 tracking-wide">LOGIN</h2>

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
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

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-black mb-3">Belum memiliki akun?</p>
                    <Link to="/register">
                        <button 
                            type="button" 
                            className="bg-white text-black font-medium px-4 py-3 w-full rounded-md border border-black hover:bg-gray-50 transition-colors"
                        >
                            Daftar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}