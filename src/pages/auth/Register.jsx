import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        konfirmasiPassword: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Add registration logic here
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#E5F3EE] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-10 w-full max-w-[450px]">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/Logo/Frame 57.png" alt="Finova Insight" className="h-16 object-contain" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-black mb-8 tracking-wide">
                    DAFTAR
                </h2>

                {/* Form */}
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="pasword"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="konfirmasiPassword"
                        placeholder="konfirmasi password"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={form.konfirmasiPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-[#1C1B1F] text-white font-medium px-4 py-3 rounded-md hover:bg-black transition-colors mt-2"
                    >
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
}
