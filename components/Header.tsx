
import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header className="h-16 bg-surface-light dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
            <div className="flex items-center flex-1 max-w-lg gap-4">
                <div className="md:hidden">
                    <span className="material-symbols-outlined cursor-pointer">menu</span>
                </div>
                {title && <h2 className="text-lg font-bold text-slate-900 dark:text-white md:hidden">{title}</h2>}
                <div className="relative w-full hidden md:block">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">search</span>
                    <input className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all" placeholder="Cari transaksi, mahasiswa, atau ID..." type="text"/>
                </div>
            </div>
            <div className="flex items-center gap-4 ml-4">
                <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-surface-dark"></span>
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
