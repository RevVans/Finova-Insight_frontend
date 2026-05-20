import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Crypto', value: 15, color: '#EF4444' }, // Red
  { name: 'Obligasi', value: 25, color: '#6366F1' }, // Indigo
  { name: 'Saham', value: 15, color: '#F97316' }, // Orange
  { name: 'Reksa Dana', value: 45, color: '#22C55E' }, // Green
];

const PortfolioPieChart = () => {
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.3;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill={data[index].color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11} className="font-medium">
                {name}
            </text>
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full w-full">
            <h3 className="text-gray-800 font-medium mb-4 text-lg">Grafik pemasukan vs perbandingan</h3>
            <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={85}
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
        </div>
    );
};

export default PortfolioPieChart;
