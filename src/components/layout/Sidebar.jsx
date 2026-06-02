import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa'; // 💡 Added a clean logout icon!

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // 💡 We need this to redirect to the login screen!

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Fixed to 'token'!
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                }
            })
            .catch((err) => console.error('Sidebar auth fetch failed:', err));
    }, []);

    // 💡 The integrated, bug-free logout logic
    const handleLogout = async () => {
        // Fixed: We use 'token', NOT 'auth_token'
        const token = localStorage.getItem('token');

        if (!token) return navigate('/');

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
        } catch (error) {
            console.error("Logout failed at server, but we will still clear local session!", error);
        } finally {
            // Guarantee the user is kicked out locally even if the server drops the connection
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        }
    };

    return (
        <div className="flex flex-col items-start px-6 py-6 gap-6 w-60 h-screen bg-white shadow-[0_0_8px_rgba(0,0,0,0.25)] z-10 sticky top-0 shrink-0">

            {/* Logo Section */}
            <div className="w-48 h-16 flex-none flex items-center">
                <img src="/Logo/logo icon.png" alt="Finova Insight" className="w-[45px] h-[45px]" />
                <span className="font-semibold text-xl text-black ml-2">Finova Insight</span>
            </div>

            {/* Menu Container */}
            <div className="flex flex-col items-start w-48 self-stretch flex-1 justify-between">

                {/* Navigation Links */}
                <div className="flex flex-col items-start gap-4 w-48">
                    <NavLink to="/dashboard" className="w-full">
                        {({ isActive }) => (
                            <div className={`flex flex-row items-center p-2 gap-2 w-48 h-10 rounded-lg transition-colors duration-300 ${isActive ? "bg-[#1C1B1F] text-white" : "text-[#1C1B1F] hover:bg-gray-100"}`}>
                                <div className="w-6 h-6 bg-transparent flex justify-center items-center shrink-0">
                                    <img src={isActive ? "/Icon/dashboard putih (active).png" : "/Icon/dashboard dark.png"} alt="Dashboard" className="w-full h-full object-contain" />
                                </div>
                                <span className="font-semibold text-base">Dashboard</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/keuangan" className="w-full">
                        {({ isActive }) => (
                            <div className={`flex flex-row items-center p-2 gap-2 w-48 h-10 rounded-lg transition-colors duration-300 ${isActive ? "bg-[#1C1B1F] text-white" : "text-[#1C1B1F] hover:bg-gray-100"}`}>
                                <div className="w-6 h-6 bg-transparent flex justify-center items-center shrink-0">
                                    <img src={isActive ? "/Icon/Keuangan putih (active).png" : "/Icon/Keuangan dark.png"} alt="Keuangan" className="w-full h-full object-contain" />
                                </div>
                                <span className="font-semibold text-base">Keuangan</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/tabungan" className="w-full">
                        {({ isActive }) => (
                            <div className={`flex flex-row items-center p-2 gap-2 w-48 h-10 rounded-lg transition-colors duration-300 ${isActive ? "bg-[#1C1B1F] text-white" : "text-[#1C1B1F] hover:bg-gray-100"}`}>
                                <div className="w-6 h-6 bg-transparent flex justify-center items-center shrink-0">
                                    <img src={isActive ? "/Icon/Tabungan putih (active).png" : "/Icon/Tabungan dark.png"} alt="Tabungan" className="w-full h-full object-contain" />
                                </div>
                                <span className="font-semibold text-base">Tabungan</span>
                            </div>
                        )}
                    </NavLink>
                </div>

                {/* 💡 The Updated User Profile & Logout Section */}
                <div className="flex flex-col w-48 gap-3">
                    {/* User Info */}
                    <div className="flex items-center w-full h-[46px]">
                        <div className="w-11 h-11 bg-[#595959] rounded-full shrink-0"></div>
                        <div className="flex flex-col ml-3 overflow-hidden">
                            <span className="font-semibold text-base leading-5 text-[#1C1B1F] whitespace-nowrap overflow-hidden text-ellipsis">
                                {user ? user.name : 'Memuat...'}
                            </span>
                            <span className="font-normal text-xs text-[#1C1B1F] whitespace-nowrap overflow-hidden text-ellipsis">
                                {user ? user.email : 'email@gmail.com'}
                            </span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-semibold text-sm border border-transparent hover:border-red-100"
                    >
                        <FaSignOutAlt /> Keluar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;