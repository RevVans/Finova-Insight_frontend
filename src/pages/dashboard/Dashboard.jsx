import React from 'react';
import axios from 'axios';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import RevenueBarChart from '../../components/dashboard/RevenueBarChart';
import PortfolioPieChart from '../../components/dashboard/PortfolioPieChart';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('auth_token');

        if (!token) return navigate('/login');

        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });

            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            navigate('/login'); // Kick them back to the login screen!

        } catch (error) {
            console.error("Logout failed!", error);
        }
    };

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />
            
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Selamat Datang, Sayang</h1>
                
                <div className="flex flex-col gap-6 max-w-[1100px]">
                    {/* Top Row: Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Card taking 2 columns */}
                        <div className="md:col-span-2 h-full">
                            <StatCard 
                                title="Total Saldo" 
                                amount="Rp10.000.000" 
                                variant="large" 
                            />
                        </div>
                        
                        {/* Right column with 2 stacked cards */}
                        <div className="flex flex-col gap-6">
                            <div className="flex-1">
                                <StatCard 
                                    title="Pemasukan" 
                                    amount="Rp10.000.000" 
                                />
                            </div>
                            <div className="flex-1">
                                <StatCard 
                                    title="Pengeluaran" 
                                    amount="Rp10.000.000" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Row: Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full">
                            <RevenueBarChart />
                        </div>
                        <div className="w-full">
                            <PortfolioPieChart />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}