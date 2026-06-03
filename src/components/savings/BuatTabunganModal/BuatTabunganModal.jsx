import React, { useState } from 'react';

const emptyForm = {
    nama: '',
    type: 'Umum', // 💡 Default enum category
    nominal: '',
    tenggat: '',
};

export default function BuatTabunganModal({ onClose, onSimpan }) {
    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nominal') {
            const rawValue = value.replace(/\D/g, '');
            if (!rawValue) {
                setForm({ ...form, [name]: '' });
                return;
            }
            const formattedValue = parseInt(rawValue, 10).toLocaleString('id-ID');
            setForm({ ...form, [name]: formattedValue });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nama || !form.nominal || !form.tenggat) return;
        onSimpan(form);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[700px] mx-4 p-8" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-black mb-6">Buat Tabungan</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input type="text" name="nama" placeholder="Nama" value={form.nama} onChange={handleChange} required className="bg-[#E0E0E0] text-gray-800 px-4 py-3 rounded-lg focus:outline-blue-500 w-full" />
                        <input type="text" name="nominal" placeholder="Nominal" value={form.nominal} onChange={handleChange} required className="bg-[#E0E0E0] text-gray-800 px-4 py-3 rounded-lg focus:outline-blue-500 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <select name="type" value={form.type} onChange={handleChange} required className="bg-[#E0E0E0] text-gray-800 px-4 py-3 rounded-lg focus:outline-blue-500 w-full">
                            <option value="Umum">Tabungan Umum</option>
                            <option value="Elektronik">Gadget & Barang Elektronik</option>
                            <option value="Otomotif">Kendaraan & Otomotif</option>
                            <option value="Edukasi">Pendidikan / Biaya Kuliah</option>
                            <option value="Hobi">Hiburan & Hobi</option>
                            <option value="Darurat">Dana Darurat</option>
                        </select>
                        <input type="date" name="tenggat" value={form.tenggat} onChange={handleChange} required className="bg-[#E0E0E0] text-gray-800 px-4 py-3 rounded-lg focus:outline-blue-500 w-full" />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-black text-black font-medium hover:bg-gray-50">Batal</button>
                        <button type="submit" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}