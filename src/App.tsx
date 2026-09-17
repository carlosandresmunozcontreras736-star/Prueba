import React, { useState } from 'react';
import { TailAdminSidebar } from './components/TailAdminSidebar';
import { TailAdminHeader } from './components/TailAdminHeader';
import { CoverPage } from './components/CoverPage';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { TelephonySection } from './components/TelephonySection';
import { IndicatorsTable } from './components/IndicatorsTable';
import { DemandTopCauses } from './components/DemandTopCauses';
import { IncidentsAndRequirements } from './components/IncidentsAndRequirements';
import { DavibankLogo } from './components/DavibankLogo';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [exceptionMode, setExceptionMode] = useState<'sin' | 'con' | 'comparativa'>('sin');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F1F5F9] text-[#1C2434] font-sans antialiased selection:bg-red-500 selection:text-white">
      {/* TailAdmin Dark Sidebar */}
      <TailAdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        exceptionMode={exceptionMode}
        setExceptionMode={setExceptionMode}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* TailAdmin White Top Header */}
        <TailAdminHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          exceptionMode={exceptionMode}
          setExceptionMode={setExceptionMode}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {activeTab === 'portada' && (
              <CoverPage
                onNavigateTab={(tab) => setActiveTab(tab)}
                exceptionMode={exceptionMode}
              />
            )}

            {activeTab === 'resumen' && (
              <ExecutiveOverview
                exceptionMode={exceptionMode}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'telefonia' && <TelephonySection />}

            {activeTab === 'indicadores' && (
              <IndicatorsTable
                exceptionMode={exceptionMode}
                setExceptionMode={setExceptionMode}
              />
            )}

            {activeTab === 'casuisticas' && <DemandTopCauses />}

            {activeTab === 'incidentes' && <IncidentsAndRequirements />}
          </div>
        </main>

        {/* TailAdmin Subtle Footer */}
        <footer className="mt-auto border-t border-[#E2E8F0] bg-white py-4 px-6 text-xs text-[#64748B] print:hidden">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <DavibankLogo size="xs" className="h-6" />
              <span className="text-slate-300">|</span>
              <span className="font-medium">
                Comité Ejecutivo &bull; Mesa de Ayuda y Soporte TI &bull; Davibank 2026
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span>Corte: 01 al 15 de Septiembre 2026</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                12/12 SLAs en Meta (100%)
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
