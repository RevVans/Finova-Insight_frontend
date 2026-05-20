import React, { useState } from 'react';
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
    // Dummy data matching the design
    const initialTransactions = Array(8).fill({
        date: '12/03/2026',
        category: 'Pemasukan',
        amount: 'Rp15.000.000',
        description: 'Deskripsi'
    }).map((item, idx) => ({ ...item, id: idx })); // Beri ID unik
    
    // Add specific categories to match the image
    initialTransactions[1].category = 'Pengeluaran';
    initialTransactions[7].category = 'Pengeluaran';

    const [transactionList, setTransactionList] = useState(initialTransactions);
    const [showModal, setShowModal] = useState(false);

    const handleTambahTransaksi = (form) => {
        const newTx = {
            id: Date.now(),
            date: formatTanggal(form.date), // Format dari date picker
            category: form.category,
            amount: 'Rp' + form.nominal, // form.nominal sudah pakai format titik
            description: form.description
        };
        // Tambahkan di urutan paling atas
        setTransactionList((prev) => [newTx, ...prev]);
    };

    const handleHapusTransaksi = (id) => {
        setTransactionList((prev) => prev.filter((tx) => tx.id !== id));
    };

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />
            
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Manajemen Keuangan</h1>
                
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-[1300px]">
                    {/* Left Column: Transaction History (takes 2 parts) */}
                    <div className="xl:col-span-2">
                        <TransactionHistoryTable 
                            transactions={transactionList} 
                            onTambah={() => setShowModal(true)} 
                            onHapus={handleHapusTransaksi}
                        />
                    </div>
                    
                    {/* Right Column: Chart (takes 1 part) */}
                    <div className="xl:col-span-1">
                        <div className="h-full">
                            <RevenueBarChart />
                        </div>
                    </div>
                </div>
            </main>

            {/* Popup Modal */}
            {showModal && (
                <TambahTransaksiModal
                    onClose={() => setShowModal(false)}
                    onSimpan={handleTambahTransaksi}
                />
            )}
        </div>
    );
}
