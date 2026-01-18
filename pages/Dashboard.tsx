
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { getFinancialSummary } from '../services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, outcome: 2400 },
  { name: 'Feb', income: 3000, outcome: 1398 },
  { name: 'Mar', income: 2000, outcome: 9800 },
  { name: 'Apr', income: 2780, outcome: 3908 },
  { name: 'May', income: 1890, outcome: 4800 },
  { name: 'Jun', income: 2390, outcome: 3800 },
];

const Dashboard: React.FC = () => {
    const [aiInsight, setAiInsight] = useState("Sedang menganalisis data keuangan...");

    useEffect(() => {
        const fetchInsight = async () => {
            const summary = await getFinancialSummary("Income 1.25M, Outcomes 450jt, Debt 350jt, Cash 2.8M. Liquidity safe for 6 months.");
            setAiInsight(summary || "Gagal memuat insight.");
        };
        fetchInsight();
    }, []);

    return (
        <Layout>
            <Header />
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 scroll-smooth">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Ringkasan Keuangan</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">Pantau kesehatan finansial kampus secara real-time.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            <span>Filter Periode</span>
                        </button>
                    </div>
                </div>

                {/* AI Insight Section */}
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 rounded-2xl shadow-xl shadow-primary/20 text-white relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-8 opacity-20 pointer-events-none">
                        <span className="material-symbols-outlined text-9xl">psychology</span>
                    </div>
                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-2">
                             <span className="material-symbols-outlined text-xl animate-pulse">auto_awesome</span>
                             <h4 className="font-bold uppercase tracking-widest text-xs opacity-90">AI Financial Insights</h4>
                        </div>
                        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-4xl italic">"{aiInsight}"</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <StatCard title="Pendapatan Bulan Ini" value="Rp 1.25M" trend="+12.5%" trendType="up" icon="attach_money" color="primary" />
                    <StatCard title="Piutang Mahasiswa" value="Rp 350jt" trend="Perhatian" trendType="warning" icon="warning" color="amber" />
                    <StatCard title="Pengeluaran Operasional" value="Rp 450jt" trend="-2.1%" trendType="down" icon="outbound" color="rose" />
                    <StatCard title="Saldo Kas Tunai" value="Rp 2.8M" trend="Aman" trendType="up" icon="account_balance_wallet" color="indigo" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold">Arus Kas Kampus</h3>
                                <p className="text-sm text-slate-500">Januari - Juni 2024</p>
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#007a8a" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#007a8a" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="income" stroke="#007a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
                                    <Area type="monotone" dataKey="outcome" stroke="#f43f5e" strokeWidth={2} fillOpacity={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                     </div>

                     <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-0 shadow-sm flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Transaksi Terkini</h3>
                        </div>
                        <ul className="divide-y divide-slate-100 dark:divide-slate-800 p-4">
                             <RecentTransaction name="Budi Santoso" type="Pembayaran SPP" amount="+5.0jt" time="10:42" color="emerald" />
                             <RecentTransaction name="Vendor: PT Lab Tech" type="Pembelian Alat Lab" amount="-12.0jt" time="09:15" color="rose" />
                             <RecentTransaction name="Siti Aminah" type="Denda Perpus" amount="+50rb" time="Kemarin" color="emerald" />
                        </ul>
                     </div>
                </div>
            </div>
        </Layout>
    );
};

const StatCard = ({ title, value, trend, trendType, icon, color }: any) => (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className={`material-symbols-outlined text-8xl text-${color}-500`}>{icon}</span>
        </div>
        <div className="relative z-10">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{value}</h3>
            <div className={`flex items-center gap-1 mt-2 text-${trendType === 'up' ? 'emerald' : trendType === 'warning' ? 'amber' : 'rose'}-600 text-sm font-bold bg-${trendType === 'up' ? 'emerald' : trendType === 'warning' ? 'amber' : 'rose'}-50 dark:bg-slate-800 w-fit px-2 py-1 rounded-md`}>
                <span>{trend}</span>
            </div>
        </div>
    </div>
);

const RecentTransaction = ({ name, type, amount, time, color }: any) => (
    <li className="p-2 flex justify-between items-center">
        <div>
            <p className="font-bold text-sm">{type}</p>
            <p className="text-xs text-slate-500">{name}</p>
        </div>
        <div className="text-right">
            <p className={`font-bold text-sm text-${color}-600`}>{amount}</p>
            <p className="text-xs text-slate-400">{time}</p>
        </div>
    </li>
);

export default Dashboard;
