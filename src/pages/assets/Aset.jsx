import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import TambahAsetModal from '../../components/assets/TambahAsetModal/TambahAsetModal';
import AssetCard from '../../components/assets/AssetCard/AssetCard';
import { FaHome, FaCar, FaMountain, FaCoins, FaBox } from 'react-icons/fa';

// Helper: pilih icon & warna berdasarkan kategori
const getIconByKategori = (kategori) => {
    switch (kategori) {
        case 'Real Estate': return { icon: FaHome, iconBg: '#C0392B' };
        case 'Barang':      return { icon: FaBox,  iconBg: '#3A7D44' };
        case 'Emas':        return { icon: FaCoins, iconBg: '#B7950B' };
        default:            return { icon: FaMountain, iconBg: '#5C6E4A' };
    }
};

// Helper: format angka ke Rupiah
const formatRupiah = (str) => {
    const num = parseInt(str.replace(/\D/g, ''), 10);
    if (isNaN(num)) return str;
    return 'Rp' + num.toLocaleString('id-ID');
};

// Helper: format tanggal dari YYYY-MM-DD ke DD Bulan YYYY
const formatTanggal = (str) => {
    if (!str) return str;
    const bulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const [y, m, d] = str.split('-');
    return `${parseInt(d)} ${bulan[parseInt(m)]} ${y}`;
};

const initialAset = [
    {
        id: 1,
        nama: 'Tanah',
        kategori: 'Real Estate',
        icon: FaMountain,
        iconBg: '#5C6E4A',
        hargaBeli: 'Rp280.000.000',
        nilaiSaatIni: 'Rp308.000.000',
        tanggalBeli: '15 Mei 2015',
        apresiasi: '+4%',
        roi: '+10%',
    },
    {
        id: 2,
        nama: 'Mobil Toyota Venturer',
        kategori: 'Barang',
        icon: FaCar,
        iconBg: '#3A7D44',
        hargaBeli: 'Rp525.000.000',
        nilaiSaatIni: 'Rp483.000.000',
        tanggalBeli: '20 Februari 2020',
        apresiasi: '+4%',
        roi: '+8%',
    },
    {
        id: 3,
        nama: 'Rumah',
        kategori: 'Real Estate',
        icon: FaHome,
        iconBg: '#C0392B',
        hargaBeli: 'Rp320.000.000',
        nilaiSaatIni: 'Rp368.000.000',
        tanggalBeli: '08 Agustus 2018',
        apresiasi: '+4%',
        roi: '+15%',
    },
];

export default function Aset() {
    const [asetList, setAsetList] = useState(initialAset);
    const [selectedId, setSelectedId] = useState(2);
    const [showModal, setShowModal] = useState(false);

    const handleTambahAset = (form) => {
        const { icon, iconBg } = getIconByKategori(form.kategori);
        const newAset = {
            id: Date.now(),
            nama: form.nama,
            kategori: form.kategori,
            icon,
            iconBg,
            hargaBeli: formatRupiah(form.hargaBeli),
            nilaiSaatIni: formatRupiah(form.hargaBeli), // default sama dengan harga beli
            tanggalBeli: formatTanggal(form.tanggalBeli),
            apresiasi: '+0%',
            roi: '+0%',
        };
        setAsetList((prev) => [...prev, newAset]);
        setSelectedId(newAset.id);
    };

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />

            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Aset</h1>

                {/* Summary Cards with removed hardcoded inline min-width styling */}
                <div className="flex gap-6 mb-8 flex-wrap">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm min-w-[220px] flex-1">
                        <p className="text-gray-500 text-sm mb-4">Total Nilai Aset</p>
                        <p className="text-3xl font-bold text-black">Rp1.125.000.000</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm min-w-[220px] flex-1">
                        <p className="text-gray-500 text-sm mb-4">Real Estate</p>
                        <p className="text-3xl font-bold text-black">Rp600.000.000</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm min-w-[220px] flex-1">
                        <p className="text-gray-500 text-sm mb-4">Barang</p>
                        <p className="text-3xl font-bold text-black">Rp525.000.000</p>
                    </div>
                </div>

                {/* Tambah Aset Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#1C1B1F] text-white py-4 rounded-full text-xl font-medium hover:bg-black transition-colors mb-8"
                >
                    Tambah Aset
                </button>

                {/* Asset Cards Grid using clean, modularized AssetCard component */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px]">
                    {asetList.map((aset) => (
                        <AssetCard
                            key={aset.id}
                            aset={aset}
                            isSelected={selectedId === aset.id}
                            onClick={() => setSelectedId(aset.id)}
                        />
                    ))}
                </div>
            </main>

            {/* Popup Modal */}
            {showModal && (
                <TambahAsetModal
                    onClose={() => setShowModal(false)}
                    onSimpan={handleTambahAset}
                />
            )}
        </div>
    );
}
