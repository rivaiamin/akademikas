
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';

const LaporanPage: React.FC = () => {
    return (
        <Layout>
            <Header title="Laporan Keuangan" />
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-6xl mx-auto flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <LaporanCard title="Total Aset" amount="15.420.000.000" growth="+12.5%" />
                        <LaporanCard title="Total Kewajiban" amount="4.200.000.000" growth="-2.1%" />
                        <LaporanCard title="Ekuitas Bersih" amount="11.220.000.000" growth="+15.3%" />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-light dark:bg-surface-dark p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-10">
                        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <button className="px-4 py-2 rounded-md text-sm font-medium bg-white dark:bg-slate-600 shadow-sm">Neraca</button>
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-500">Laba Rugi</button>
                        </div>
                        <div className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-slate-400 text-sm">calendar_month</span>
                            <span className="text-sm font-semibold">Jan 2024 - Des 2024</span>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-10">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                                <tr>
                                    <th className="py-4 pl-6 text-xs font-bold uppercase w-32">Kode</th>
                                    <th className="py-4 px-4 text-xs font-bold uppercase">Nama Akun</th>
                                    <th className="py-4 pr-6 text-xs font-bold uppercase text-right">Saldo Akhir</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <AccountRow code="1.0.000" name="ASET" amount="15.420.000.000" isHeader />
                                <AccountRow code="1.1.000" name="Aset Lancar" amount="5.200.000.000" isSubHeader />
                                <AccountRow code="1.1.001" name="Kas Kampus Utama" amount="1.250.000.000" />
                                <AccountRow code="1.1.002" name="Bank BNI - Operasional" amount="2.500.000.000" />
                                
                                <AccountRow code="2.0.000" name="KEWAJIBAN" amount="4.200.000.000" isHeader />
                                <AccountRow code="2.1.000" name="Kewajiban Jangka Pendek" amount="1.200.000.000" isSubHeader />
                                <AccountRow code="2.1.001" name="Utang Gaji Staf" amount="800.000.000" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const LaporanCard = ({ title, amount, growth }: any) => (
    <div className="rounded-xl p-5 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 shadow-sm">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black mt-1">Rp {amount}</p>
        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">{growth} vs tahun lalu</span>
    </div>
);

const AccountRow = ({ code, name, amount, isHeader, isSubHeader }: any) => (
    <tr className={`${isHeader ? 'bg-slate-50/50 dark:bg-slate-800/20 border-t' : ''}`}>
        <td className={`py-4 pl-6 font-mono text-xs ${isHeader ? 'font-black' : isSubHeader ? 'text-slate-500' : 'text-slate-400'}`}>{code}</td>
        <td className={`py-4 px-4 ${isHeader ? 'font-black' : isSubHeader ? 'pl-10 font-bold' : 'pl-16 text-sm'}`}>{name}</td>
        <td className={`py-4 pr-6 text-right font-mono ${isHeader ? 'font-black' : isSubHeader ? 'font-bold' : 'text-sm'}`}>{amount}</td>
    </tr>
);

export default LaporanPage;
