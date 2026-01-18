
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { JournalEntry } from '../types';

const DaftarJurnalPage: React.FC = () => {
    const journals: JournalEntry[] = [
        { date: "24 Okt 2023", ref: "AUTO-PG-231008", desc: "Penerimaan UKT - Budi Santoso", source: "Sistem", amount: "5.400.000", status: "Posted" },
        { date: "24 Okt 2023", ref: "AUTO-SB-231012", desc: "Pendapatan Asrama - Okt", source: "Sistem", amount: "125.000.000", status: "Posted" },
        { date: "23 Okt 2023", ref: "JV-2023-10-041", desc: "Restock ATK Kantor", source: "Manual", amount: "450.000", status: "Posted" },
        { date: "22 Okt 2023", ref: "JV-2023-10-040", desc: "Pembayaran Listrik & Air", source: "Manual", amount: "18.500.000", status: "Posted" },
    ];

    return (
        <Layout>
            <Header title="Daftar Jurnal" />
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-[1200px] mx-auto space-y-6">
                    <div className="flex justify-between items-end">
                        <h2 className="text-2xl font-black">Daftar Jurnal Terintegrasi</h2>
                        <div className="flex gap-2">
                             <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold text-sm border border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-lg">filter_list</span> Filter
                            </button>
                             <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md">
                                <span className="material-symbols-outlined text-lg">add</span> Entri Manual
                            </button>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Tanggal</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ref</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase w-1/3">Deskripsi</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Sumber</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Total (IDR)</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {journals.map((j, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        <td className="p-4 text-sm font-bold">{j.date}</td>
                                        <td className="p-4 text-sm font-mono text-primary cursor-pointer hover:underline">{j.ref}</td>
                                        <td className="p-4 text-sm">{j.desc}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${j.source === 'Sistem' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{j.source}</span>
                                        </td>
                                        <td className="p-4 text-sm text-right font-mono font-bold">{j.amount}</td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 text-[10px] font-bold">
                                                <span className="material-symbols-outlined text-[14px]">check_circle</span> Seimbang
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DaftarJurnalPage;
