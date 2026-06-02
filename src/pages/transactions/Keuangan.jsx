import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 💡 Added Axios import
import Sidebar from '../../components/layout/Sidebar';
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
                    description: tx.desc || 'Tanpa Deskripsi'
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
                alert('Transaksi berhasil disimpan!');
                fetchTransactionHistory();
                setShowModal(false);
            }
        } catch (error) {
            console.error('Validation errors:', error.response?.data || error.message);
            alert('Gagal menyimpan transaksi. Periksa kembali data Anda.');
        }
    };

    const handleHapusTransaksi = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) return;

        try {
            // 💡 Refactored to Axios DELETE
            const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/transactions/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data.success) {
                setTransactionList((prev) => prev.filter((tx) => tx.id !== id));
            } else {
                alert('Gagal menghapus data dari server.');
            }
        } catch (error) {
            console.error('Error deleting transaction:', error.response?.data || error.message);
            alert('Gagal menghubungi server.');
        }
    };

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Manajemen Keuangan</h1>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-[1300px]">
                    <div className="xl:col-span-2">
                        <TransactionHistoryTable
                            transactions={transactionList}
                            onTambah={() => setShowModal(true)}
                            onHapus={handleHapusTransaksi}
                        />
                    </div>
                    <div className="xl:col-span-1">
                        <div className="h-full">
                            <RevenueBarChart />
                        </div>
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