import React from 'react';

const InvestmentTab = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border border-gray-200 rounded-full p-2 bg-white gap-2 max-w-full">
            <button 
                className={`flex-1 py-3 text-center rounded-full font-medium transition-colors ${
                    activeTab === 'instrumen' 
                    ? 'bg-[#1C1B1F] text-white' 
                    : 'bg-[#1C1B1F] text-white opacity-80 hover:opacity-100' // Keeping both dark as per image, but slightly faded for inactive
                }`}
                onClick={() => setActiveTab('instrumen')}
            >
                Instrumen
            </button>
            <button 
                className={`flex-1 py-3 text-center rounded-full font-medium transition-colors ${
                    activeTab === 'portofolio' 
                    ? 'bg-[#1C1B1F] text-white' 
                    : 'bg-[#1C1B1F] text-white opacity-80 hover:opacity-100'
                }`}
                onClick={() => setActiveTab('portofolio')}
            >
                Portofolio
            </button>
        </div>
    );
};

export default InvestmentTab;
