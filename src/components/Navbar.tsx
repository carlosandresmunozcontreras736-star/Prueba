import React from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Printer,
  SlidersHorizontal,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { DavibankLogo } from './DavibankLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  exceptionMode: 'sin' | 'con' | 'comparativa';
  setExceptionMode: (mode: 'sin' | 'con' | 'comparativa') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  exceptionMode,
  setExceptionMode,
}) => {
  const tabs = [
    { id: 'portada', label: 'Portada Oficial' },
    { id: 'resumen', label: 'Resumen Ejecutivo' },
    { id: 'telefonia', label: 'Telefonía & Colas' },
    { id: 'indicadores', label: 'Tabla de Indicadores' },
    { id: 'casuisticas', label: 'Top Casuísticas & Demanda' },
    { id: 'incidentes', label: 'Incidentes & Requerimientos' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top corporate bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('portada')}
              className="flex items-center space-x-2 text-left hover:opacity-90 transition-opacity cursor-pointer"
            >
              <DavibankLogo size="xs" variant="white" className="h-6" />
            </button>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-medium">
              Comité Ejecutivo de Operaciones & Tecnología
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>Corte: <strong>01 al 15 de Septiembre 2026</strong></span>
            </div>

            <div className="hidden sm:flex items-center space-x-1 text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/40 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Cumplimiento Global (Sept)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation & controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Logo brand on left + Navigation tabs */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('portada')}
              className="hidden md:flex items-center shrink-0 pr-3 border-r border-slate-200 hover:opacity-85 transition-opacity cursor-pointer"
              title="Ir a Portada del Informe"
            >
              <DavibankLogo size="sm" className="h-8" />
            </button>

            <nav className="flex items-center space-x-1" aria-label="Tabs">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-red-50 text-red-700 border border-red-200/80 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Exception mode selector & print action */}
          <div className="flex items-center space-x-2.5 self-end lg:self-auto">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
              <span className="text-slate-500 px-2 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                <span className="hidden md:inline">Cálculo:</span>
              </span>
              <button
                id="filter-sin-excepcion"
                onClick={() => setExceptionMode('sin')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  exceptionMode === 'sin'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sin Excepción
              </button>
              <button
                id="filter-con-excepcion"
                onClick={() => setExceptionMode('con')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  exceptionMode === 'con'
                    ? 'bg-white text-red-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Con Excepción
              </button>
              <button
                id="filter-comparativa"
                onClick={() => setExceptionMode('comparativa')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  exceptionMode === 'comparativa'
                    ? 'bg-red-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Comparar Ambas
              </button>
            </div>

            <button
              id="btn-imprimir-reporte"
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-lg shadow-2xs transition-colors"
              title="Imprimir o Exportar PDF para el Comité"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Exportar / Imprimir</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
