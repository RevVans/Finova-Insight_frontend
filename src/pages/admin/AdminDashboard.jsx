import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                // Use a try-catch specifically for the API call to handle potential network issues
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Ensure response.data is an array before setting state
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else if (response.data && Array.isArray(response.data.data)) {
                    // Sometimes Laravel returns data nested in a 'data' property
                    setUsers(response.data.data);
                } else {
                    console.warn("API did not return an array of users:", response.data);
                    setUsers([]); // Fallback to empty array to prevent map errors
                }

            } catch (error) {
                console.error("Gagal mengambil data user:", error);
                // Optionally show a toast if data fetching fails
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Gagal memuat data pengguna',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Keluar dari akun?',
            text: "Sesi Anda saat ini akan diakhiri.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal',
            // Added styling properties to match your UI better
            customClass: {
                confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                cancelButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/');
            }
        });
    };

    const handleDeleteAttempt = () => {
        if (!selectedId) {
            Swal.fire({
                title: 'Pilih Akun',
                text: 'Silakan klik pada salah satu baris akun terlebih dahulu sebelum menghapus.',
                icon: 'warning',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        // Show the info toast (Since it's MVP restricted)
        Swal.fire({
            title: 'Akses Ditolak',
            text: `Fitur hapus akun (ID: ${selectedId}) dinonaktifkan pada versi MVP untuk menjaga integritas data relasional.`,
            icon: 'info',
            confirmButtonColor: '#1C1B1F'
        });

        // Clear selection after showing the message
        setSelectedId(null);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-8 max-w-[1200px] mx-auto">
                <div className="flex items-center gap-4">
                    <div className="bg-black text-white p-2 rounded-lg">
                        {/* Shield Icon */}
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-black">Selamat Datang, Admin</h1>
                </div>
                <button onClick={handleLogout} className="text-red-500 border border-red-200 bg-red-50 px-6 py-2 rounded-xl hover:bg-red-100 transition-colors font-semibold">
                    Keluar
                </button>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-[1200px] mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-black">Akun</h2>
                    {/* Hapus Akun Button */}
                    <button
                        onClick={handleDeleteAttempt}
                        className={`${selectedId ? 'bg-red-600 hover:bg-red-700' : 'bg-[#1C1B1F] hover:bg-black'
                            } text-white px-6 py-2.5 rounded-lg font-medium transition-colors`}
                    >
                        Hapus Akun {selectedId ? `(${selectedId})` : ''}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600">
                                <th className="p-4 font-semibold rounded-tl-lg border-b-2 border-gray-200">ID User</th>
                                <th className="p-4 font-semibold border-b-2 border-gray-200">Email</th>
                                <th className="p-4 font-semibold rounded-tr-lg border-b-2 border-gray-200">Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => setSelectedId(user.id === selectedId ? null : user.id)}
                                        className={`border-b border-gray-100 cursor-pointer transition-colors ${user.id === selectedId
                                                ? 'bg-red-50/60 hover:bg-red-50' // Muted red for selection to match UI tone
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <td className="p-4 text-gray-800 font-medium">{String(user.id).padStart(4, '0')}</td>
                                        <td className="p-4 text-gray-800">{user.email}</td>
                                        <td className="p-4 text-gray-800">{user.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-8 text-center text-gray-500">
                                        {/* Added a subtle loading indicator */}
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Memuat data pengguna...</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Status Message area matching the mockup style */}
                    <div className="mt-4 h-6">
                        {selectedId ? (
                            <p className="text-sm text-red-500 font-medium animate-pulse">
                                * Akun ID {selectedId} terpilih.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-400">
                                Pilih salah satu baris untuk tindakan lebih lanjut.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}