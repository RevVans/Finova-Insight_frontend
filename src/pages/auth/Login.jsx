import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
                email: email,
                password: password
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log("Login successful!");

            // Send them through the Unified Door!
            if (response.data.user.role === 'admin') {
                navigate('/admin-dashboard');
            }
            else {
                navigate('/dashboard');
            }

        } catch (error) {
            // 💡 3. Smart error catching for Laravel!
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors); // Catches 422 Validation
            } else if (error.response && error.response.status === 401) {
                // Catches 401 Unauthorized (Wrong password/email)
                setErrors({ email: [error.response.data.message || "Email atau password salah!"] });
            } else {
                console.error("Login failed!", error);
                setErrors({ email: ["Terjadi kesalahan pada server. Coba lagi nanti."] });
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#E5F3EE] flex items-center justify-center relative p-4">
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
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs font-medium mt-1 ml-1">{errors.password[0]}</p>}
                    {errors.email && <p className="text-red-500 text-xs font-medium ml-1">{errors.email[0]}</p>}
                    <Link to="/forgot-password" className="text-sm text-black hover:underline font-medium">Lupa Password?</Link>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-medium px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
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
                            className="bg-white text-black font-medium px-4 py-3 w-full rounded-md border border-black hover:bg-gray-200 transition-colors"
                        >
                            Daftar
                        </button>
                    </Link>
                </div>
            </div >
        </div >
    );
}