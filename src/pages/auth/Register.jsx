import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});

        if (password !== passwordConfirmation) {
            setErrors({ password_confirmation: ["The passwords do not match!"] });
            return;

        }
        try {
            // 2. Send the registration payload to Laravel
            await api.post('/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });

            console.log("Account created successfully!");

            // 3. The Flow You Wanted: Kick them to the login page!
            navigate('/');

        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors); // Save Laravel's complaints to state
            } else {
                console.error("Something else broke!", error);
            }
        }
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
                        name="name"
                        placeholder="Nama"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p style={{ color: 'red', fontSize: '12px', margin: '0 0 10px 0' }}>{errors.name[0]}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Alamat Email"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: '12px', margin: '0 0 10px 0' }}>{errors.email[0]}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p style={{ color: 'red', fontSize: '12px', margin: '0 0 10px 0' }}>{errors.password[0]}</p>}

                    <input
                        type="password"
                        name="konfirmasiPassword"
                        placeholder="Konfirmasi Password"
                        className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <p style={{ color: 'red', fontSize: '12px', margin: '0 0 10px 0' }}>{errors.password_confirmation[0]}</p>}

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
