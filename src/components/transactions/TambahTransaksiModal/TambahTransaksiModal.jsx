import React, { useState } from 'react';

const kategoriOptions = ['Pemasukan', 'Pengeluaran'];

const emptyForm = {
    date: '',
    category: '',
    nominal: '',
    description: '',
};

export default function TambahTransaksiModal({ onClose, onSimpan }) {
    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'nominal') {
            const rawValue = value.replace(/\D/g, ''); // Ambil hanya angka
            if (!rawValue) {
                setForm({ ...form, [name]: '' });
                return;
            }
            // Format dengan titik setiap 3 digit (standar Indonesia)
            const formattedValue = parseInt(rawValue, 10).toLocaleString('id-ID');
            setForm({ ...form, [name]: formattedValue });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.date || !form.category || !form.nominal || !form.description) return;
        onSimpan(form);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-[700px] mx-4 p-8 border-2 border-[#7C3AED]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-black mb-6">Tambah Transaksi</h2>

                <form onSubmit={handleSubmit}>
                    {/* Row 1: Tanggal & Kategori */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="date"
                            placeholder="DD/MM/YYYY"
                            value={form.date}
                            onChange={handleChange}
                            required
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                            className="bg-[#E0E0E0] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        />

                        <div className="relative">
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="bg-[#E0E0E0] text-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Kategori</option>
                                {kategoriOptions.map((kat) => (
                                    <option key={kat} value={kat}>{kat}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Nominal & Deskripsi */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <input
                            type="text"
                            name="nominal"
                            placeholder="Nominal"
                            value={form.nominal}
                            onChange={handleChange}
                            required
                            className="bg-[#E0E0E0] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        />

                        <input
                            type="text"
                            name="description"
                            placeholder="Deskripsi"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="bg-[#E0E0E0] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg border border-black text-black font-medium hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-[#1C1B1F] text-white font-medium hover:bg-black transition-colors"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
