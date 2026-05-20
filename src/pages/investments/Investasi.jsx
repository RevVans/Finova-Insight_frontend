import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import InvestmentTab from '../../components/investments/InvestmentTab';
import InvestmentCard from '../../components/investments/InvestmentCard';
import PortofolioView from '../../components/investments/PortofolioView/PortofolioView';

export default function Investasi() {
    const [activeTab, setActiveTab] = useState('instrumen');

    // Dummy data matching the design
    const investments = Array(4).fill({
        title: 'Saham',
        expectedReturn: '10%',
        minInvestment: 'Rp1.000.000'
    });

    return (
        <div className="flex bg-[#F8F9FA] min-h-screen">
            <Sidebar />
            
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold text-black mb-8">Investasi</h1>
                
                <div className="flex flex-col gap-8 max-w-[1100px]">
                    {/* Top Row: Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-full">
                            <StatCard 
                                title="Total Portofolio" 
                                amount="Rp10.000.000" 
                                variant="large" 
                            />
                        </div>
                        <div className="h-full">
                            <StatCard 
                                title="Total Return" 
                                amount="Rp10.000.000" 
                                variant="large" 
                            />
                        </div>
                    </div>
                    
                    {/* Middle Row: Tabs */}
                    <div className="w-full">
                        <InvestmentTab activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    
                    {/* Bottom Row: Conditional Content */}
                    {activeTab === 'instrumen' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {investments.map((inv, idx) => (
                                <InvestmentCard 
                                    key={idx}
                                    title={inv.title}
                                    expectedReturn={inv.expectedReturn}
                                    minInvestment={inv.minInvestment}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full">
                            <PortofolioView />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
