
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { suggestJournalEntry } from '../services/geminiService';
import { JournalRow } from '../types';

const EntriJurnalPage: React.FC = () => {
    const [rows, setRows] = useState<JournalRow[]>([
        { id: '1', account: '5-1002 • Biaya Listrik', description: 'Tagihan PLN Oktober', debit: 1500000, credit: 0 },
        { id: '2', account: '1-1002 • Bank BNI', description: '', debit: 0, credit: 1500000 },
    ]);
    const [loadingAI, setLoadingAI] = useState(false);
    const [aiQuery, setAiQuery] = useState("");

    const totalDebit = rows.reduce((sum, row) => sum + (row.debit || 0), 0);
    const totalCredit = rows.reduce((sum, row) => sum + (row.credit || 0), 0);
    const isBalanced = totalDebit === totalCredit && totalDebit > 0;

    const handleAiSuggest = async () => {
        if (!aiQuery) return;
        setLoadingAI(true);
        const suggestion = await suggestJournalEntry(aiQuery);
        if (suggestion.rows && suggestion.rows.length > 0) {
            setRows(suggestion.rows.map((r: any, idx: number) => ({ ...r, id: String(Date.now() + idx) })));
        }
        setLoadingAI(false);
    };

    const addRow = () => {
        setRows([...rows, { id: String(Date.now()), account: '', description: '', debit: 0, credit: 0 }]);
    };

    const removeRow = (id: string) => {
        setRows(rows.filter(r => r.id !== id));
    };

    const updateRow = (id: string, field: keyof JournalRow, value: any) => {
        setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    return (
        <Layout>
            <Header title="Entri Jurnal" />
            <div className="flex-1 overflow-y-auto p-6 pb-32">
                <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Entri Jurnal Baru</h2>
                            <p className="text-slate-500 text-sm">Catat transaksi manual double-entry.</p>
                        </div>
                    </div>

                    {/* AI Quick Input */}
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full">
                            <label className="text-[10px] uppercase font-bold text-primary mb-1 block">AI Smart Journal Suggester</label>
                            <input 
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                className="w-full bg-white dark:bg-slate-800 border-none rounded-lg text-sm shadow-sm placeholder:text-slate-400" 
                                placeholder="Cth: Bayar tagihan air gedung serbaguna 2.5jt via Bank Mandiri"
                            />
                        </div>
                        <button 
                            onClick={handleAiSuggest}
                            disabled={loadingAI}
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold text-sm shadow transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {loadingAI ? <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span> : <span className="material-symbols-outlined text-sm">auto_awesome</span>}
                            Generate Jurnal
                        </button>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-3">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tanggal</label>
                                <input type="date" className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm" defaultValue="2024-10-24" />
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">No. Referensi</label>
                                <input type="text" className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm font-mono" defaultValue="JV-2024-10-042" />
                            </div>
                            <div className="md:col-span-5">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Memo Utama</label>
                                <input type="text" className="w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm" placeholder="Keterangan transaksi umum..." />
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Akun (COA)</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Keterangan</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Debit</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Kredit</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        <td className="p-2 w-1/4">
                                            <input 
                                                value={row.account}
                                                onChange={(e) => updateRow(row.id, 'account', e.target.value)}
                                                className="w-full border-none bg-transparent text-sm font-medium focus:ring-0" 
                                                placeholder="Pilih Akun..."
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input 
                                                value={row.description}
                                                onChange={(e) => updateRow(row.id, 'description', e.target.value)}
                                                className="w-full border-none bg-transparent text-sm focus:ring-0" 
                                                placeholder="Keterangan baris..."
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input 
                                                type="number"
                                                value={row.debit || ''}
                                                onChange={(e) => updateRow(row.id, 'debit', Number(e.target.value))}
                                                className="w-full border-none bg-transparent text-sm text-right font-mono font-bold focus:ring-0" 
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="p-2">
                                            <input 
                                                type="number"
                                                value={row.credit || ''}
                                                onChange={(e) => updateRow(row.id, 'credit', Number(e.target.value))}
                                                className="w-full border-none bg-transparent text-sm text-right font-mono font-bold focus:ring-0" 
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="p-2 text-center">
                                            <button onClick={() => removeRow(row.id)} className="p-1 hover:bg-rose-50 rounded-full transition-colors">
                                                <span className="material-symbols-outlined text-slate-300 hover:text-rose-500 transition-colors">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                            <button onClick={addRow} className="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-500 font-bold hover:bg-white dark:hover:bg-slate-800 hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-sm">add_circle</span> Tambah Baris
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="fixed bottom-0 left-0 md:left-72 right-0 bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-700 shadow-lg p-4 z-30">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center">
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Total Debit</span>
                            <span className="text-lg font-mono font-bold">Rp {totalDebit.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">Total Kredit</span>
                            <span className="text-lg font-mono font-bold">Rp {totalCredit.toLocaleString()}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 rounded-full border ${isBalanced ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-amber-600 bg-amber-50 border-amber-200'}`}>
                            <span className="material-symbols-outlined text-sm">{isBalanced ? 'check_circle' : 'warning'}</span>
                            <span className="text-sm font-bold">{isBalanced ? 'Seimbang' : 'Tidak Seimbang'}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Draft</button>
                        <button 
                            disabled={!isBalanced}
                            className={`px-6 py-2 rounded-lg font-bold shadow-lg transition-all ${isBalanced ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                        >
                            Posting Jurnal
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EntriJurnalPage;
