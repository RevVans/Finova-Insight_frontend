import React, { useState } from 'react';

const TransactionHistoryTable = ({ transactions, onTambah, onHapus }) => {
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-black">Riwayat Transaksi</h3>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsDeleteMode(!isDeleteMode)}
                        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                            isDeleteMode 
                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                : 'border border-black bg-white text-black hover:bg-gray-50'
                        }`}
                    >
                        {isDeleteMode ? 'Selesai Hapus' : 'Hapus Riwayat'}
                    </button>
                    <button 
                        onClick={onTambah}
                        className="bg-[#1C1B1F] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-black transition-colors"
                    >
                        Tambah Riwayat
                    </button>
                </div>
            </div>

            <div className="bg-[#EEEEEE] rounded-lg overflow-hidden flex-1 p-2">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="py-3 px-6 font-medium text-gray-500 w-1/4">Tanggal</th>
                            <th className="py-3 px-6 font-medium text-gray-500 w-1/4">Tipe</th>
                            <th className="py-3 px-6 font-medium text-gray-500 w-1/4">Nominal</th>
                            <th className="py-3 px-6 font-medium text-gray-500 w-1/4">Kategori</th>
                            <th className="py-3 px-6 font-medium text-gray-500 w-1/4">Deskripsi</th>
                            {isDeleteMode && <th className="py-3 px-6 font-medium text-gray-500 w-16 text-center">Aksi</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, index) => (
                            <tr key={index} className="border-b border-gray-300 last:border-b-0">
                                <td className="py-4 px-6 text-black">{tx.date}</td>
                                <td className="py-4 px-6 text-black">{tx.type}</td>
                                <td className="py-4 px-6 text-black">{tx.amount}</td>
                                <td className="py-4 px-6 text-black">{tx.category}</td>
                                <td className="py-4 px-6 text-black">{tx.description}</td>
                                {isDeleteMode && (
                                    <td className="py-4 px-6 text-center">
                                        <button 
                                            onClick={() => onHapus(tx.id)}
                                            className="text-red-500 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                            title="Hapus Transaksi"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistoryTable;
