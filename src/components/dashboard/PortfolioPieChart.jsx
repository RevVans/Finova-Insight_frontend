import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// 💡 Color dictionary mapped to your database enums!
const CATEGORY_COLORS = {
    Elektronik: '#0D9488', // Teal
    Otomotif: '#DC2626',   // Red
    Edukasi: '#2563EB',    // Blue
    Hobi: '#9333EA',       // Purple
    Darurat: '#D97706',    // Amber
    Umum: '#4B5563',       // Gray
};

// 💡 Accept chartData as a prop!
const PortfolioPieChart = ({ chartData = [] }) => {
    
    // Transform backend data to fit Recharts format, ignoring empty categories
    const formattedData = chartData.map(item => ({
        name: item.category,
        value: parseInt(item.total, 10),
        color: CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Umum
    })).filter(item => item.value > 0);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill={formattedData[index]?.color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11} className="font-medium">
                {name}
            </text>
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full w-full">
            <h3 className="text-gray-800 font-medium mb-4 text-lg">Alokasi Target Tabungan</h3>
            <div className="h-[250px] w-full mt-4">
                {formattedData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formattedData}
                                cx="50%"
                                cy="50%"
                                outerRadius={85}
                                dataKey="value"
                                label={renderCustomizedLabel}
                                labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">Belum ada data tabungan</div>
                )}
            </div>
        </div>
    );
};

export default PortfolioPieChart;