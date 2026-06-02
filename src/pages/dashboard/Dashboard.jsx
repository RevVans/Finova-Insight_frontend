import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import RevenueBarChart from '../../components/dashboard/RevenueBarChart';
import PortfolioPieChart from '../../components/dashboard/PortfolioPieChart';
import { useNavigate } from 'react-router-dom';

const formatRupiah = (num) => {
    const isNegative = num < 0;
    const absoluteValue = Math.abs(num ?? 0);
    return (isNegative ? '-Rp' : 'Rp') + absoluteValue.toLocaleString('id-ID');
};

export default function Dashboard() {
    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState({
        total_saldo: 0,
        total_pemasukan: 0,
        total_pengeluaran: 0,
        bar_chart: [],
        pie_chart: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data.success) {
                    setDashboardData(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) return <div className="flex p-10">Memuat Dashboard...</div>;

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />
            
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Selamat Datang</h1>
                
                <div className="flex flex-col gap-6 max-w-[1100px]">
                    {/* Top Row: Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Card taking 2 columns */}
                        <div className="md:col-span-2 h-full">
                            <StatCard 
                                title="Total Saldo" 
                                amount={formatRupiah(dashboardData.total_saldo)} 
                                variant="large" 
                            />
                        </div>
                        
                        {/* Right column with 2 stacked cards */}
                        <div className="flex flex-col gap-6">
                            <div className="flex-1">
                                <StatCard 
                                    title="Pemasukan" 
                                    amount={formatRupiah(dashboardData.total_pemasukan)} 
                                />
                            </div>
                            <div className="flex-1">
                                <StatCard 
                                    title="Pengeluaran" 
                                    amount={formatRupiah(dashboardData.total_pengeluaran)} 
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Row: Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full">
                            <RevenueBarChart chartData={dashboardData.bar_chart} />
                        </div>
                        <div className="w-full">
                            <PortfolioPieChart chartData={dashboardData.pie_chart} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}