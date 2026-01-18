
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Tagihan from './pages/Tagihan';
import EntriJurnal from './pages/EntriJurnal';
import DaftarJurnal from './pages/DaftarJurnal';
import Laporan from './pages/Laporan';
import Rekonsiliasi from './pages/Rekonsiliasi';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tagihan" element={<Tagihan />} />
                <Route path="/akuntansi/entri" element={<EntriJurnal />} />
                <Route path="/akuntansi/daftar" element={<DaftarJurnal />} />
                <Route path="/laporan" element={<Laporan />} />
                <Route path="/rekonsiliasi" element={<Rekonsiliasi />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
