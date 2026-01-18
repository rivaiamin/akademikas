
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { Student } from '../types';

const TagihanPage: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const students: Student[] = [
        { id: 1, name: "Budi Santoso", nim: "21001045", type: "UKT Semester 5", amount: "5.000.000", date: "20 Jan 2024", status: "Belum Lunas", color: "amber" },
        { id: 2, name: "Siti Aminah", nim: "21002391", type: "UKT Semester 5", amount: "4.500.000", date: "20 Jan 2024", status: "Lunas", color: "emerald", img: "https://picsum.photos/100/100?random=2" },
        { id: 3, name: "Ahmad Rizki", nim: "22001122", type: "Denda Perpustakaan", amount: "75.000", date: "15 Jan 2024", status: "Jatuh Tempo", color: "rose" },
        { id: 4, name: "Clara Wijaya", nim: "21005678", type: "Biaya Wisuda", amount: "1.200.000", date: "10 Feb 2024", status: "Lunas", color: "emerald" },
        { id: 5, name: "Dimas Saputra", nim: "22003344", type: "UKT Semester 3", amount: "5.000.000", date: "20 Jan 2024", status: "Belum Lunas", color: "amber" },
    ];

    return (
        <Layout>
            <Header />
            <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                 <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Daftar Tagihan Mahasiswa</h2>
                            <p className="text-slate-500 dark:text-slate-400">Kelola status pembayaran UKT dan tagihan akademik lainnya.</p>
                        </div>
                        <div className="flex gap-3">
                             <button className="flex items-center justify-center gap-2 px-5 h-10 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-md transition-all text-sm font-semibold">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Buat Tagihan
                            </button>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                        <div className="relative w-full lg:max-w-md">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none material-symbols-outlined text-slate-400">search</span>
                            <input className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm" placeholder="Cari Nama, NIM..." type="text"/>
                        </div>
                        <div className="flex gap-3">
                            <select className="px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"><option>Semua Prodi</option></select>
                            <select className="px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"><option>Semua Status</option></select>
                        </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Mahasiswa</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">NIM</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Jenis Tagihan</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Jumlah (Rp)</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {students.map((student) => (
                                        <tr key={student.id} onClick={() => setSelectedStudent(student)} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                                        {student.img ? <img src={student.img} className="w-full h-full object-cover"/> : <span className="text-xs font-bold">{student.name.substring(0,2)}</span>}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold">{student.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-500">{student.nim}</td>
                                            <td className="px-6 py-4 text-sm">{student.type}</td>
                                            <td className="px-6 py-4 text-sm text-right font-mono font-bold">{student.amount}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${student.color}-100 text-${student.color}-800 border border-${student.color}-200`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                 </div>

                {selectedStudent && (
                    <div className="absolute inset-y-0 right-0 w-full md:w-[450px] bg-white dark:bg-[#1b212d] shadow-2xl border-l border-gray-200 dark:border-gray-700 z-30 flex flex-col transform transition-transform duration-300 ease-in-out animate-slide-in">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="text-lg font-bold">Detail Pembayaran</h3>
                            <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="h-12 w-12 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden">
                                     {selectedStudent.img ? <img src={selectedStudent.img} className="w-full h-full object-cover"/> : <span className="text-xs font-bold">{selectedStudent.name.substring(0,2)}</span>}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">{selectedStudent.name}</h4>
                                    <p className="text-xs text-slate-500">{selectedStudent.nim}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-3 dark:border-slate-800"><span className="text-sm text-slate-500">Jenis</span><span className="text-sm font-medium">{selectedStudent.type}</span></div>
                                <div className="flex justify-between border-b pb-3 dark:border-slate-800"><span className="text-sm text-slate-500">Jumlah</span><span className="text-sm font-bold">Rp {selectedStudent.amount}</span></div>
                                <div className="flex justify-between border-b pb-3 dark:border-slate-800"><span className="text-sm text-slate-500">Tenggat</span><span className="text-sm font-medium">{selectedStudent.date}</span></div>
                            </div>
                            
                            {selectedStudent.status === "Lunas" ? (
                                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                                        <span className="text-sm font-bold text-primary">Auto-Journal Posted</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Sistem membuat jurnal otomatis 1101 (Debit) dan 1103 (Kredit) untuk transaksi ini.</p>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-amber-600 text-[18px]">pending</span>
                                        <span className="text-sm font-bold text-amber-600">Menunggu Pembayaran</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Ingatkan mahasiswa melalui sistem notifikasi otomatis jika melewati batas waktu.</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cetak Bukti</button>
                                <button className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">Edit Tagihan</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TagihanPage;
