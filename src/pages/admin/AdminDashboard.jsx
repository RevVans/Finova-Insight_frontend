import React, { useState } from 'react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([
        { id: '0001', email: 'revansigma123@gmail.com', username: 'revansigma123' },
        { id: '0002', email: 'alifputra456@gmail.com', username: 'alifputra456' },
        { id: '0003', email: 'budi_hartono@yahoo.com', username: 'budihartono' },
    ]);
    const [selectedId, setSelectedId] = useState(null);

    const handleHapusAkun = () => {
        if (!selectedId) {
            alert('Silakan pilih akun yang ingin dihapus terlebih dahulu (klik pada baris tabel).');
            return;
        }
        
        if (window.confirm(`Apakah Anda yakin ingin menghapus akun dengan ID ${selectedId}?`)) {
            setAccounts((prev) => prev.filter((acc) => acc.id !== selectedId));
            setSelectedId(null);
        }
    };

    const handleLogout = () => {
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 flex flex-col items-center">
            <div className="w-full max-w-[1200px]">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                            <MdAdminPanelSettings className="w-8 h-8 text-black" />
                        </div>
                        <h1 className="text-3xl font-bold text-black tracking-tight">Selamat Datang, Admin</h1>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-50 text-red-600 border border-red-200 font-semibold px-5 py-2.5 rounded-xl hover:bg-red-100 hover:text-red-700 transition-all text-sm"
                    >
                        Keluar
                    </button>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    {/* Card Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-black">Akun</h2>
                        <button 
                            onClick={handleHapusAkun}
                            className="bg-[#1C1B1F] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-black transition-colors text-sm shadow-sm"
                        >
                            Hapus Akun
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-[#EEEEEE] rounded-xl overflow-hidden p-2">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="py-4 px-6 font-semibold text-gray-600 w-1/4">ID User</th>
                                    <th className="py-4 px-6 font-semibold text-gray-600 w-2/5">Email</th>
                                    <th className="py-4 px-6 font-semibold text-gray-600 w-1/3">Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="py-8 text-center text-gray-500 font-medium bg-white rounded-lg">
                                            Tidak ada akun yang terdaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    accounts.map((acc) => (
                                        <tr 
                                            key={acc.id} 
                                            onClick={() => setSelectedId(acc.id === selectedId ? null : acc.id)}
                                            className={`border-b border-gray-300 last:border-b-0 cursor-pointer transition-colors ${
                                                acc.id === selectedId 
                                                    ? 'bg-purple-100/80 hover:bg-purple-100' 
                                                    : 'hover:bg-gray-100/50'
                                            }`}
                                        >
                                            <td className="py-4 px-6 text-black font-medium">{acc.id}</td>
                                            <td className="py-4 px-6 text-black">{acc.email}</td>
                                            <td className="py-4 px-6 text-black">{acc.username}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {selectedId && (
                        <p className="mt-4 text-sm text-purple-600 font-medium animate-pulse">
                            * Akun ID {selectedId} terpilih. Klik "Hapus Akun" untuk menghapus.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
