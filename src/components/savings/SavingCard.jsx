import React from 'react';
import {
    FaLaptop,
    FaCar,
    FaGraduationCap,
    FaGamepad,
    FaShieldAlt,
    FaPiggyBank,
    FaTrash,
} from 'react-icons/fa';

// 💡 Maps backend enums straight to React Icons, colors, and tailwind badges
const CATEGORY_CONFIG = {
    Elektronik: { label: 'Gadget & Barang', color: 'bg-teal-100 text-teal-700', iconBg: '#0D9488', Icon: FaLaptop },
    Otomotif: { label: 'Kendaraan', color: 'bg-red-100 text-red-700', iconBg: '#DC2626', Icon: FaCar },
    Edukasi: { label: 'Pendidikan', color: 'bg-blue-100 text-blue-700', iconBg: '#2563EB', Icon: FaGraduationCap },
    Hobi: { label: 'Hiburan & Hobi', color: 'bg-purple-100 text-purple-700', iconBg: '#9333EA', Icon: FaGamepad },
    Darurat: { label: 'Dana Darurat', color: 'bg-amber-100 text-amber-700', iconBg: '#D97706', Icon: FaShieldAlt },
    Umum: { label: 'Tabungan Umum', color: 'bg-gray-100 text-gray-700', iconBg: '#4B5563', Icon: FaPiggyBank }
};

const formatRupiah = (num) => 'Rp' + (num ?? 0).toLocaleString('id-ID');

// 💡 Converted to explicit export default function mapping
export default function SavingCard({ item, onAction, onDelete }) {
    const config = CATEGORY_CONFIG[item.type] || CATEGORY_CONFIG.Umum;
    const IconComponent = config.Icon;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full relative group">
            <button
                onClick={() => onDelete(item.id)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                title="Hapus Tabungan"
            >
                <FaTrash size={14} />
            </button>
            <div className="space-y-4">
                {/* Header Section: Dynamic React Icon & Title */}
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl transition-colors"
                        style={{ backgroundColor: config.iconBg }}
                    >
                        <IconComponent />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-1 ${config.color}`}>
                            {config.label}
                        </span>
                    </div>
                </div>

                {/* Progress Details Section */}
                <div className="mt-2">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Progress</p>
                    <div className="text-2xl font-bold text-emerald-600 flex flex-wrap items-baseline gap-1">
                        {formatRupiah(item.current_amount)}
                        <span className="text-gray-400 text-sm font-normal">/</span>
                        <span className="text-gray-500 text-sm font-normal">{formatRupiah(item.target_amount)}</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-2 font-medium">
                        Tenggat: {item.deadline_date}
                    </p>
                </div>
            </div>

            {/* Action Triggers: Passes data structure straight back to parent element modal */}
            <div className="mt-6 flex gap-2">
                <button
                    onClick={() => onAction(item, 'deposit')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    Tabung
                </button>
                <button
                    onClick={() => onAction(item, 'withdrawal')}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    Tarik
                </button>
            </div>
        </div>
    );
}