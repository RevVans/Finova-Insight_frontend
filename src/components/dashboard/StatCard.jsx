import React from 'react';

const StatCard = ({ title, amount, variant = 'default' }) => {
    if (variant === 'large') {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between h-full min-h-[220px] shadow-sm">
                <h3 className="text-gray-700 font-medium text-lg">{title}</h3>
                <div className="text-4xl font-bold text-black mt-auto">{amount}</div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-center h-full min-h-[100px]">
            <h3 className="text-gray-700 font-medium mb-1">{title}</h3>
            <div className="text-3xl font-bold text-black">{amount}</div>
        </div>
    );
};

export default StatCard;
