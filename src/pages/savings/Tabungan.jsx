import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import SavingCard from '../../components/savings/SavingCard';
import BuatTabunganModal from '../../components/savings/BuatTabunganModal/BuatTabunganModal';
import { FaGamepad, FaTruck, FaLaptop, FaPiggyBank } from 'react-icons/fa';

// Helper: format angka ke Rupiah
const formatRupiah = (str) => {
    const num = parseInt(str.replace(/\D/g, ''), 10);
    if (isNaN(num)) return str;
    return 'Rp' + num.toLocaleString('id-ID');
};

// Helper: format tanggal dari YYYY-MM-DD ke DD/MM/YYYY
const formatTanggal = (str) => {
    if (!str) return str;
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
};

const initialSavings = [
    {
        id: 1,
        title: 'PlayStation',
        category: 'Barang',
        currentAmount: 'Rp1.500.000',
        targetAmount: 'Rp7.500.000',
        deadline: '10/09/2026',
        icon: FaGamepad,
        iconBgColor: '#1F545C' // Dark teal
    },
    {
        id: 2,
        title: 'Kendaraan',
        category: 'Barang',
        currentAmount: 'Rp15.000.000',
        targetAmount: 'Rp240.000.000',
        deadline: '10/08/2027',
        icon: FaTruck,
        iconBgColor: '#9B2C3A' // Dark red
    },
    {
        id: 3,
        title: 'Laptop',
        category: 'Barang',
        currentAmount: 'Rp2.000.000',
        targetAmount: 'Rp12.000.000',
        deadline: '10/10/2026',
        icon: FaLaptop,
        iconBgColor: '#888888' // Gray
    }
];

export default function Tabungan() {
    const [savingsList, setSavingsList] = useState(initialSavings);
    const [showModal, setShowModal] = useState(false);

    const handleBuatTabungan = (form) => {
        const newSaving = {
            id: Date.now(),
            title: form.nama,
            category: 'Tabungan Baru', // Karena kategori tidak diinput, kita beri default
            currentAmount: 'Rp0',
            targetAmount: formatRupiah(form.nominal),
            deadline: formatTanggal(form.tenggat),
            icon: FaPiggyBank, // Default icon untuk tabungan baru
            iconBgColor: '#7C3AED' // Default color purple
        };
        setSavingsList((prev) => [...prev, newSaving]);
    };

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />
            
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Tabungan</h1>
                
                <div className="flex flex-col gap-8 max-w-[1100px]">
                    {/* Buat Tabungan Button */}
                    <button 
                        onClick={() => setShowModal(true)}
                        className="w-full bg-[#1C1B1F] text-white py-4 rounded-full text-xl font-medium hover:bg-black transition-colors"
                    >
                        Buat Tabungan
                    </button>
                    
                    {/* Savings Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savingsList.map((saving) => (
                            <SavingCard 
                                key={saving.id}
                                title={saving.title}
                                category={saving.category}
                                currentAmount={saving.currentAmount}
                                targetAmount={saving.targetAmount}
                                deadline={saving.deadline}
                                icon={saving.icon}
                                iconBgColor={saving.iconBgColor}
                            />
                        ))}
                    </div>
                </div>
            </main>

            {/* Popup Modal */}
            {showModal && (
                <BuatTabunganModal
                    onClose={() => setShowModal(false)}
                    onSimpan={handleBuatTabungan}
                />
            )}
        </div>
    );
}
