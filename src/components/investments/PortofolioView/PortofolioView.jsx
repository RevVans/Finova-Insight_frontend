import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Reksa Dana', value: 50, color: '#22C55E' }, // Green
  { name: 'Crypto', value: 10, color: '#EF4444' }, // Red
  { name: 'Obligasi', value: 25, color: '#6366F1' }, // Blue
  { name: 'Saham', value: 15, color: '#F97316' }, // Orange
];

export default function PortofolioView() {
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.35;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text 
                x={x} 
                y={y} 
                fill={data[index].color} 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central" 
                fontSize={12} 
                className="font-medium"
            >
                {name}
            </text>
        );
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full min-h-[400px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Diversifikasi aset</h2>

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left side: Pie Chart */}
                <div className="w-full md:w-1/2 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                dataKey="value"
                                label={renderCustomizedLabel}
                                labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Right side: Legend and Percentages */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-[#F1F1F1] rounded-lg px-4 py-3">
                            <div className="flex items-center gap-4">
                                <div 
                                    className="w-5 h-5 rounded-sm" 
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="font-medium text-gray-800">{item.name}</span>
                            </div>
                            <span className="font-bold text-black text-lg">%{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
