import React from 'react';

const InvestmentCard = ({ title, expectedReturn, minInvestment }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xl font-medium text-black">{title}</h3>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <p className="text-gray-500 text-sm mb-1">Expected Return</p>
                    <p className="text-3xl font-bold text-[#22C55E]">{expectedReturn}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">Min. Investasi</p>
                    <p className="text-3xl font-bold text-black">{minInvestment}</p>
                </div>
            </div>
            
            <button className="w-full mt-4 bg-[#1C1B1F] text-white py-3 rounded-lg font-medium hover:bg-black transition-colors">
                Investasi Sekarang
            </button>
        </div>
    );
};

export default InvestmentCard;
