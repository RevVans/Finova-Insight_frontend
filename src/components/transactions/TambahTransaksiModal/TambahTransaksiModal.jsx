import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function TambahTransaksiModal({ onClose, onSimpan }) {
    // 1. Core form fields matching Laravel's validation criteria
    const [type, setType] = useState('expense');
    const [date, setDate] = useState('');
    const [nominal, setNominal] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');

    // Storage container for categories pulled from the database
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // 2. Pull categories dynamically on mount
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setCategories(res.data);
                    if (res.data.length > 0) setCategoryId(res.data[0].id); // Default to first item
                }
            })
            .catch((err) => console.error('Gagal mengambil kategori:', err))
            .finally(() => setLoadingCategories(false));
    }, []);

    // Helper: Formats numbers with dots on input entry
    const handleNominalChange = (e) => {
        const val = e.target.value.replace(/\D/g, ''); // Strip non-numeric text
        if (!val) {
            setNominal('');
            return;
        }
        setNominal(parseInt(val, 10).toLocaleString('id-ID'));
    };

    // 3. Package and submit payload
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !nominal || !categoryId) {
            Swal.fire({
                text: "Semua field wajib diisi!",
                icon: "warning",
                confirmButtonColor: "#3b82f6"
            });
            return;
        }

        // Clean out the visual formatting dots before transmitting integers to Laravel
        const rawAmount = nominal.replace(/\./g, '');

        const cleanedPayload = {
            type: type,                  // 'income' or 'expense'
            amount: parseInt(rawAmount, 10),
            date: date,                  // 'YYYY-MM-DD' from picker
            desc: description || null,
            category_id: parseInt(categoryId, 10)
        };

        // Fire the parent execution block to run the POST method
        onSimpan(cleanedPayload);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Tambah Riwayat Transaksi</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Jenis Transaksi</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={`py-2.5 rounded-xl font-semibold border transition ${type === 'expense' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                            >
                                Pengeluaran
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`py-2.5 rounded-xl font-semibold border transition ${type === 'income' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                            >
                                Pemasukan
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tanggal</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kategori</label>
                        {loadingCategories ? (
                            <div className="text-sm text-gray-400 py-2">Memuat daftar kategori...</div>
                        ) : (
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-blue-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nominal (Rp)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-2.5 text-gray-400 font-medium text-sm">Rp</span>
                            <input
                                type="text"
                                value={nominal}
                                onChange={handleNominalChange}
                                placeholder="0"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-gray-800 font-medium focus:outline-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Deskripsi</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Catatan tambahan..."
                            rows="2"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-blue-500 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-gray-200 rounded-xl py-2.5 font-semibold text-gray-500 hover:bg-gray-100"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white rounded-xl py-2.5 font-semibold hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
