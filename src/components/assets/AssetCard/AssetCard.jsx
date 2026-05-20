import React from 'react';

export default function AssetCard({ aset, isSelected, onClick }) {
    const Icon = aset.icon;
    const isNegativeRoi = aset.roi && aset.roi.startsWith('-');

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer transition-all duration-200 ${
                isSelected 
                    ? 'border-2 border-[#7C3AED] ring-2 ring-[#DDD6FE]' 
                    : 'border border-gray-200 hover:border-gray-300'
            }`}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl"
                    style={{ backgroundColor: aset.iconBg }}
                >
                    {Icon && <Icon />}
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-black">{aset.nama}</h3>
                    <p className="text-gray-500 text-sm">{aset.kategori}</p>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-4 mb-5">
                <div>
                    <p className="text-gray-400 text-xs mb-1">Harga Beli</p>
                    <p className="text-black font-semibold text-sm">{aset.hargaBeli}</p>
                </div>
                <div>
                    <p className="text-gray-400 text-xs mb-1">Nilai Saat Ini</p>
                    <p className={`font-semibold text-sm ${isNegativeRoi ? 'text-[#E53E3E]' : 'text-[#22C55E]'}`}>
                        {aset.nilaiSaatIni}
                    </p>
                </div>
                <div>
                    <p className="text-gray-400 text-xs mb-1">Tanggal Beli</p>
                    <p className="text-black font-semibold text-sm">{aset.tanggalBeli}</p>
                </div>
                <div>
                    <p className="text-gray-400 text-xs mb-1">Apresiasi/Tahun</p>
                    <p className="text-black font-semibold text-sm">{aset.apresiasi}</p>
                </div>
            </div>

            {/* ROI Badge */}
            <div
                className={`rounded-lg px-4 py-2 text-sm font-semibold inline-block border transition-colors ${
                    isNegativeRoi
                        ? 'border-[#E53E3E] text-[#E53E3E] bg-[#FFF5F5]'
                        : 'border-[#22C55E] text-[#22C55E] bg-[#F0FDF4]'
                }`}
            >
                ROI {aset.roi}
            </div>
        </div>
    );
}
