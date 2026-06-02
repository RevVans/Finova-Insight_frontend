import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 💡 Simple dictionary to translate month numbers to Indonesian abbreviations
const monthNames = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'Mei', '06': 'Jun',
    '07': 'Jul', '08': 'Ags', '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des'
};

const formatYAxis = (tickItem) => {
    if (tickItem === 0) return '0';
    return `${tickItem / 1000000}Jt`;
};

// 💡 Accept chartData as a prop!
const RevenueBarChart = ({ chartData = [] }) => {
    
    // Transform backend data to match the old hardcoded structure
    const formattedData = chartData.map(item => ({
        name: monthNames[item.month] || item.month,
        pemasukan: parseInt(item.income, 10) || 0,
        pengeluaran: parseInt(item.expense, 10) || 0
    }));

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full w-full">
            <h3 className="text-gray-800 font-medium mb-8 text-lg">Pemasukan vs Pengeluaran</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={formattedData}
                        margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#f3f4f6' }} formatter={(value) => `Rp ${(value / 1000000).toFixed(1)}Jt`} />
                        <Bar dataKey="pemasukan" fill="#34D399" radius={[0, 0, 0, 0]} barSize={45} />
                        <Bar dataKey="pengeluaran" fill="#FB7185" radius={[0, 0, 0, 0]} barSize={45} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueBarChart;