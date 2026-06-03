import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/layout/Sidebar';
import Swal from 'sweetalert2';
import TransactionHistoryTable from '../../components/transactions/TransactionHistoryTable';
import RevenueBarChart from '../../components/dashboard/RevenueBarChart';
import TambahTransaksiModal from '../../components/transactions/TambahTransaksiModal/TambahTransaksiModal';

// Helper: format tanggal dari YYYY-MM-DD ke DD/MM/YYYY
const formatTanggal = (str) => {
    if (!str) return str;
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
};

export default function Keuangan() {
    const [transactionList, setTransactionList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchTransactionHistory = async () => {
        try {
            // 💡 Refactored to Axios GET
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/transactions`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data.success) {
                const mappedTx = response.data.data.map((tx) => ({
                    id: tx.id,
                    date: formatTanggal(tx.date),
                    type: tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
                    category: tx.category ? tx.category.name : 'Umum',
                    amount: 'Rp' + parseInt(tx.amount, 10).toLocaleString('id-ID'),
                    description: tx.desc || '-'
                }));
                setTransactionList(mappedTx);
            }
        } catch (error) {
            console.error('Failed to load transaction history:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactionHistory();
    }, []);

    const handleSimpanTransaksi = async (cleanedPayload) => {
        try {
            // 💡 Refactored to Axios POST (auto-stringifies payload)
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/transactions`, cleanedPayload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data.success) {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Transaksi berhasil disimpan!',
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,
                    willClose: () => {
                    }
                });
                fetchTransactionHistory();
                setShowModal(false);
            }
        } catch (error) {
            console.error('Validation errors:', error.response?.data || error.message);
            Swal.fire({
                icon: "error",
                title: "Gagal Menyimpan!",
                text: "Terjadi kesalahan pada sistem kami. Silakan coba beberapa saat lagi.",
            });
        }
    };

    const handleHapusTransaksi = (id) => {
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
                    // 💡 Refactored to Axios DELETE
                    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });

                    if (response.data.success) {
                        Swal.fire({
                            title: 'Dihapus!',
                            text: 'Transaksi telah berhasil dihapus.',
                            icon: 'success',
                            timer: 2500,
                            showConfirmButton: false
                        });
                        setTransactionList((prev) => prev.filter((tx) => tx.id !== id));
                    } else {
                        alert('Gagal menghapus data dari server.');
                    }
                } catch (error) {
                    console.error('Error deleting transaction:', error.response?.data || error.message);
                    Swal.fire('Gagal!', 'Terjadi kesalahan pada sistem kami. Silakan coba beberapa saat lagi.', 'error');
                }
            }
        });
    }

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Manajemen Keuangan</h1>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-[1300px]">
                    <div className="xl:col-span-3">
                        <TransactionHistoryTable
                            transactions={transactionList}
                            onTambah={() => setShowModal(true)}
                            onHapus={handleHapusTransaksi}
                        />
                    </div>
                </div>
            </main>

            {showModal && (
                <TambahTransaksiModal
                    onClose={() => setShowModal(false)}
                    onSimpan={handleSimpanTransaksi}
                />
            )}
        </div>
    );
}