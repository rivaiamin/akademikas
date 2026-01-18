import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { path: "/", icon: "dashboard", label: "Dashboard" },
        { path: "/tagihan", icon: "receipt_long", label: "Tagihan Mahasiswa", badge: "12" },
        { path: "/akuntansi/daftar", icon: "book", label: "Jurnal Akuntansi" },
        { path: "/rekonsiliasi", icon: "sync_alt", label: "Rekonsiliasi" },
        { path: "/laporan", icon: "description", label: "Laporan & Audit" },
    ];

    return (
        <aside className="w-72 bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between hidden md:flex shrink-0 transition-colors duration-200">
            <div className="p-6 flex flex-col gap-6 h-full">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold leading-none tracking-tight">AkademiKas</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Sistem Keuangan</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium group ${
                                isActive(item.path) 
                                ? "bg-primary/10 text-primary font-bold border-l-4 border-primary"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.path) ? "icon-filled" : ""}`}>{item.icon}</span>
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                                    isActive(item.path) ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                }`}>{item.badge}</span>
                            )}
                        </Link>
                    ))}
                    
                    <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-[10px]">Pencatatan</p>
                        <Link to="/akuntansi/entri" className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${isActive('/akuntansi/entri') ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}>
                            <span className="material-symbols-outlined text-[20px]">edit_note</span>
                            Entri Jurnal Baru
                        </Link>
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="mt-4 flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border-2 border-white dark:border-slate-600 shadow-sm" style={{backgroundImage: "url('https://picsum.photos/100/100?random=1')"}}></div>
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-bold truncate">Sarah Wijaya</p>
                            <p className="text-xs text-slate-500 truncate text-[10px]">Kepala Keuangan</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;