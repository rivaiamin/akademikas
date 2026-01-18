
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};

export default Layout;
