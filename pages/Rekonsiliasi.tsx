
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const RekonsiliasiPage: React.FC = () => {
    return (
        <Layout>
            <Header title="Rekonsiliasi Bank" />
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-[#121620]">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6 h-full">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="text-3xl font-black">Rekonsiliasi Bank</h1>
                            <p className="text-slate-500 font-medium">Periode: <span className="text-slate-900 dark:text-white font-bold">Oktober 2024</span></p>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-1 flex shadow-sm">
                                <button className="px-3 py-1 text-xs font-bold text-slate-500">Sep</button>
                                <button className="px-3 py-1 text-xs font-bold bg-primary text-white rounded shadow">Okt</button>
                                <button className="px-3 py-1 text-xs font-bold text-slate-500">Nov</button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ReconSummary title="Saldo Bank" amount="1.500.000.000" color="blue" />
                        <ReconSummary title="Saldo Sistem" amount="1.450.000.000" color="indigo" />
                        <ReconSummary title="Selisih" amount="50.000.000" color="amber" isHighlight />
                    </div>

                    <div className="flex-1 min-h-[500px] flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-12">
                        <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-700">
                            <div className="p-4 border-b dark:border-slate-700 font-black text-sm flex items-center justify-between">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Mutasi Bank (E-Statement)</span>
                                <button className="text-[10px] text-primary font-bold">Import CSV</button>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <table className="w-full text-xs">
                                    <tbody className="divide-y dark:divide-slate-700">
                                        <ReconRow date="01/10" desc="TRF E-Channel" amount="1.500.000" isMatched />
                                        <ReconRow date="02/10" desc="TRF ATM BERSAMA" amount="4.200.000" isSelected />
                                        <ReconRow date="03/10" desc="TRF MASUK LLDIKTI" amount="50.000.000" isSelected />
                                        <ReconRow date="05/10" desc="BIAYA ADMIN BANK" amount="25.000" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-12 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center gap-4">
                             <button className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">link</span></button>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="p-4 border-b dark:border-slate-700 font-black text-sm flex items-center justify-between">
                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Transaksi Sistem</span>
                            </div>
                            <div className="flex-1 overflow-y-auto">
                                <table className="w-full text-xs">
                                    <tbody className="divide-y dark:divide-slate-700">
                                        <ReconRow date="01/10" desc="UKT Siti Aminah" amount="1.500.000" isMatched />
                                        <ReconRow date="02/10" desc="UKT Ahmad Zaky" amount="4.200.000" isSelected />
                                        <tr className="bg-slate-100 dark:bg-slate-800/40 h-16"><td colSpan={4} className="text-center text-[10px] text-slate-400 italic">Tidak ada transaksi sistem cocok untuk nominal 50.000.000</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 animate-slide-in">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold">Terpilih</span>
                        <span className="font-black text-sm">2 Baris</span>
                    </div>
                    <div className="h-6 w-px bg-slate-700"></div>
                    <button className="bg-primary hover:bg-primary-dark px-6 py-1.5 rounded-full font-black text-xs flex items-center gap-2 transition-all">
                        <span className="material-symbols-outlined text-sm">link</span> Link Transaksi
                    </button>
                </div>
            </div>
        </Layout>
    );
};

const ReconSummary = ({ title, amount, color, isHighlight }: any) => (
    <div className={`bg-surface-light dark:bg-surface-dark rounded-xl p-5 border shadow-sm ${isHighlight ? 'border-amber-200 ring-2 ring-amber-500/20' : 'border-slate-200 dark:border-slate-700'}`}>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        <p className={`text-2xl font-black mt-1 ${isHighlight ? 'text-amber-600' : ''}`}>Rp {amount}</p>
    </div>
);

const ReconRow = ({ date, desc, amount, isMatched, isSelected }: any) => (
    <tr className={`${isMatched ? 'opacity-40 grayscale' : ''} ${isSelected ? 'bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'} transition-colors cursor-pointer`}>
        <td className="p-4 w-10">
            {isMatched ? <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span> : <input type="checkbox" checked={isSelected} readOnly className="rounded text-primary focus:ring-primary border-slate-300 dark:bg-slate-700 dark:border-slate-600"/>}
        </td>
        <td className="p-4 whitespace-nowrap font-medium text-slate-500">{date}</td>
        <td className="p-4 font-bold">{desc}</td>
        <td className="p-4 text-right font-mono font-black">{amount}</td>
    </tr>
);

export default RekonsiliasiPage;
