import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Sidebar from '../../components/layout/Sidebar';
import SavingCard from '../../components/savings/SavingCard';
import BuatTabunganModal from '../../components/savings/BuatTabunganModal/BuatTabunganModal';
import {
    FaLaptop,
    FaCar,
    FaGraduationCap,
    FaGamepad,
    FaShieldAlt,
    FaPiggyBank
} from 'react-icons/fa';

// 💡 Lookup Dictionary
const CATEGORY_CONFIG = {
    Elektronik: { label: 'Gadget & Barang', color: 'bg-teal-100 text-teal-700', Icon: FaLaptop },
    Otomotif: { label: 'Kendaraan', color: 'bg-red-100 text-red-700', Icon: FaCar },
    Edukasi: { label: 'Pendidikan', color: 'bg-blue-100 text-blue-700', Icon: FaGraduationCap },
    Hobi: { label: 'Hiburan & Hobi', color: 'bg-purple-100 text-purple-700', Icon: FaGamepad },
    Darurat: { label: 'Dana Darurat', color: 'bg-amber-100 text-amber-700', Icon: FaShieldAlt },
    Umum: { label: 'Tabungan Umum', color: 'bg-gray-100 text-gray-700', Icon: FaPiggyBank }
};

export default function Tabungan() {
    const [savingsList, setSavingsList] = useState([]); // 💡 Start empty!
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [actionModal, setActionModal] = useState({ isOpen: false, item: null, mode: 'deposit' });
    const [actionNominal, setActionNominal] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Dana');

    // 💡 1. Fetch data from Laravel on load
    useEffect(() => {
        fetchSavings();
    }, []);

    const fetchSavings = async () => {
        try {
            // Adjust the URL if you have a global Axios instance configured!
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/savings`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setSavingsList(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data tabungan:", error);
        }
    };
    // Handle Create New Vault
    const handleBuatTabungan = async (form) => {
        const cleanNominal = parseInt(form.nominal.replace(/\D/g, ''), 10);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/savings`, {
                name: form.nama,
                type: form.type,
                target_amount: cleanNominal,
                deadline_date: form.tenggat
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            // If success, add the newly generated database row straight to our UI!
            if (response.data.success) {
                setSavingsList((prev) => [...prev, response.data.data]);
                setShowCreateModal(false);
            }
        } catch (error) {
            console.error("Gagal membuat tabungan:", error.response?.data || error.message);
            Swal.fire('Gagal!', 'Terjadi kesalahan pada sistem kami. Silakan coba beberapa saat lagi.', 'error');
        }
    };

    // Open the Action Modal & Reset Input
    const handleOpenActionModal = (item, mode) => {
        setActionModal({ isOpen: true, item, mode });
        setActionNominal(''); // Clear input every time it opens!
    };

    // 💡 Live Number Formatter for the Action Modal
    const handleActionNominalChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        if (!rawValue) {
            setActionNominal('');
            return;
        }
        const formattedValue = parseInt(rawValue, 10).toLocaleString('id-ID');
        setActionNominal(formattedValue);
    };

    // Handle Submitting Deposit/Withdrawal
    const handleActionSubmit = async (e) => {
        e.preventDefault();
        const cleanNominal = parseInt(actionNominal.replace(/\D/g, ''), 10);
        if (!cleanNominal || cleanNominal <= 0) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/savings/${actionModal.item.id}/adjust`, {
                amount: cleanNominal,
                flow_direction: actionModal.mode, // 'deposit' or 'withdrawal'
                date: new Date().toISOString().split('T')[0] // Sends today's date (YYYY-MM-DD)
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data.success) {
                // Laravel returns the freshly updated model, so we just swap it into our array!
                const updatedSaving = response.data.data;

                setSavingsList(prev => prev.map(saving =>
                    saving.id === updatedSaving.id ? updatedSaving : saving
                ));

                setActionModal({ isOpen: false, item: null, mode: 'deposit' });
                setActionNominal('');
            }
        } catch (error) {
            console.error("Gagal memproses transaksi:", error.response?.data || error.message);
            // Show the exact error message from Laravel (like "Saldo tidak mencukupi")
            Swal.fire('Gagal!', 'Nominal penarikan melebihi tabungan anda.', 'error');
        }
    };

    const handleHapusTabungan = (id) => {
        // Add a safety check so users don't accidentally delete their data!
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Transaksi ini akan dihapus permanen dari riwayat!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/savings/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });

                    if (response.data.success) {
                        Swal.fire({
                            title: 'Dihapus!',
                            text: 'Tabungan telah berhasil dihapus.',
                            icon: 'success',
                            timer: 2500,
                            showConfirmButton: false
                        });
                        setSavingsList(prev => prev.filter(saving => saving.id !== id));
                    }
                } catch (error) {
                    console.error("Gagal menghapus tabungan:", error.response?.data || error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Tabungan tidak bisa dihapus karena masih ada saldo! Tarik semua dana terlebih dahulu.",
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        });
    }

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Tabungan</h1>
                <div className="flex flex-col gap-8 max-w-[1100px]">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="w-full bg-blue-600 text-white py-2 rounded-full text-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                        Buat Tabungan
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savingsList.map((savingRow) => (
                            <SavingCard
                                key={savingRow.id}
                                item={savingRow}
                                onAction={handleOpenActionModal}
                                onDelete={handleHapusTabungan}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Create Vault Modal */}
            {showCreateModal && (
                <BuatTabunganModal
                    onClose={() => setShowCreateModal(false)}
                    onSimpan={handleBuatTabungan}
                />
            )}

            {/* Deposit / Withdraw Modal */}
            {actionModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border-2 border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            {actionModal.mode === 'deposit' ? 'Tabung:' : 'Tarik:'} <span className="text-emerald-600">{actionModal.item.name}</span>
                        </h2>
                        <form onSubmit={handleActionSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Nominal (Rp)</label>
                                {/* 💡 Changed type to 'text' so the ID-ID dots actually render! */}
                                <input
                                    type="text"
                                    required
                                    placeholder="Masukkan nominal"
                                    value={actionNominal}
                                    onChange={handleActionNominalChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Metode Pembayaran
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="bg-white border border-gray-200 text-gray-800 px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full font-medium appearance-none"
                                >
                                    <option value="Dana">DANA</option>
                                    <option value="Gopay">GoPay</option>
                                    <option value="Ovo">OVO</option>
                                    <option value="ShopeePay">ShopeePay</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setActionModal({ isOpen: false, item: null, mode: 'deposit' })}
                                    className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className={`px-5 py-2.5 text-white rounded-lg text-sm font-medium transition shadow-sm ${actionModal.mode === 'deposit'
                                        ? 'bg-emerald-600 hover:bg-emerald-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    {actionModal.mode === 'deposit' ? 'Simpan Setoran' : 'Konfirmasi Penarikan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}