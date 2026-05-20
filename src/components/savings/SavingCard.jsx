import React, { useState } from 'react';

// Helper: parse string Rp ke angka
const parseRupiah = (str) => parseInt(str.replace(/\D/g, ''), 10) || 0;

// Helper: format angka ke string Rp
const formatRupiah = (num) => 'Rp' + num.toLocaleString('id-ID');

const SavingCard = ({ title, category, currentAmount, targetAmount, deadline, icon: Icon, iconBgColor }) => {
    // State lokal untuk progress dan input nominal
    const [currentProgress, setCurrentProgress] = useState(parseRupiah(currentAmount));
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        // Ambil hanya angka dari input
        const rawValue = e.target.value.replace(/\D/g, '');
        if (!rawValue) {
            setInputValue('');
            return;
        }
        // Format dengan titik setiap 3 digit (standar Indonesia)
        setInputValue(parseInt(rawValue, 10).toLocaleString('id-ID'));
    };

    const handleTabung = () => {
        const nominalToAdd = parseInt(inputValue.replace(/\D/g, ''), 10);
        if (!nominalToAdd) return;
        
        // Tambahkan nominal ke progress
        setCurrentProgress((prev) => prev + nominalToAdd);
        
        // Kosongkan input setelah berhasil menabung
        setInputValue('');
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4 h-full">
            <div className="flex items-center gap-4">
                <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl" 
                    style={{ backgroundColor: iconBgColor }}
                >
                    {Icon && <Icon />}
                </div>
                <div>
                    <h3 className="text-xl font-medium text-black">{title}</h3>
                    <p className="text-gray-600">{category}</p>
                </div>
            </div>
            
            <div className="mt-4">
                <p className="text-gray-500 text-sm mb-1">Progress</p>
                <div className="text-3xl font-bold text-[#22C55E]">
                    {formatRupiah(currentProgress)}<span className="text-[#22C55E]">/</span>{targetAmount}
                </div>
                <p className="text-gray-500 text-sm mt-2">Tenggat: {deadline}</p>
            </div>
            
            <div className="flex gap-3 mt-auto pt-4">
                <input 
                    type="text" 
                    placeholder="Nominal"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-1 bg-[#E5E5E5] text-gray-800 placeholder-gray-500 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button 
                    onClick={handleTabung}
                    className="bg-[#1C1B1F] text-white px-6 py-2 rounded-md font-medium hover:bg-black transition-colors"
                >
                    Tabung
                </button>
            </div>
        </div>
    );
};

export default SavingCard;
