import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  PhoneCall,
  Table2,
  BarChart3,
  CheckSquare,
  Printer,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  X,
  SlidersHorizontal,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { DavibankLogo } from './DavibankLogo';

interface TailAdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  exceptionMode: 'sin' | 'con' | 'comparativa';
  setExceptionMode: (mode: 'sin' | 'con' | 'comparativa') => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const TailAdminSidebar: React.FC<TailAdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  exceptionMode,
  setExceptionMode,
  isOpen,
  setIsOpen,
}) => {
  const [dashboardOpen, setDashboardOpen] = useState(true);

  const navItemClass = (isActive: boolean) =>
    `group relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-medium text-sm transition-colors duration-150 cursor-pointer ${
      isActive
        ? 'bg-[#333A48] text-white shadow-xs'
        : 'text-[#DEE4EE] hover:bg-[#333A48]/60 hover:text-white'
    }`;

  const subNavItemClass = (isActive: boolean) =>
    `flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
      isActive
        ? 'text-white bg-red-600/20 text-red-300 font-semibold'
        : 'text-[#8A99AD] hover:text-white hover:bg-[#333A48]/40'
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-[#1C2434] duration-300 ease-linear lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-[#2E3A4B] shadow-xl lg:shadow-none select-none`}
      >
        {/* Sidebar Header: Davibank Brand Logo */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 border-b border-[#2E3A4B]/60">
          <button
            onClick={() => {
              setActiveTab('portada');
              setIsOpen(false);
            }}
            className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity cursor-pointer"
          >
            <DavibankLogo size="sm" variant="white" className="h-8" />
            <div>
              <span className="block text-[11px] uppercase tracking-wider font-extrabold text-red-500">
                Comité Ejecutivo
              </span>
              <span className="block text-xs font-medium text-[#8A99AD]">
                Mesa de Ayuda & TI
              </span>
            </div>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="block lg:hidden text-[#8A99AD] hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation scrollable area */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear px-4 py-4 space-y-6">
          {/* Group 1: MENU PRINCIPAL */}
          <div>
            <h3 className="mb-2.5 ml-3 text-xs font-bold uppercase tracking-wider text-[#8A99AD]">
              MENU PRINCIPAL
            </h3>

            <div className="flex flex-col gap-1">
              {/* Dashboard Dropdown / Group */}
              <div>
                <button
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                  className={`w-full flex items-center justify-between rounded-lg px-3.5 py-2.5 font-medium text-sm transition-colors cursor-pointer ${
                    activeTab === 'resumen' || activeTab === 'portada'
                      ? 'bg-[#333A48] text-white'
                      : 'text-[#DEE4EE] hover:bg-[#333A48]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="w-5 h-5 text-red-400" />
                    <span>Dashboard</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A99AD] transition-transform duration-200 ${
                      dashboardOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Submenu items */}
                {dashboardOpen && (
                  <div className="mt-1 flex flex-col gap-1 pl-4 border-l border-[#2E3A4B] ml-4 my-1">
                    <button
                      onClick={() => {
                        setActiveTab('resumen');
                        setIsOpen(false);
                      }}
                      className={subNavItemClass(activeTab === 'resumen')}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      <span>Resumen Ejecutivo</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('portada');
                        setIsOpen(false);
                      }}
                      className={subNavItemClass(activeTab === 'portada')}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>Portada Oficial</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Telefonía & Colas */}
              <button
                onClick={() => {
                  setActiveTab('telefonia');
                  setIsOpen(false);
                }}
                className={navItemClass(activeTab === 'telefonia')}
              >
                <PhoneCall className="w-5 h-5 text-blue-400" />
                <span className="flex-1 text-left">Telefonía & Colas</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                  99,56%
                </span>
              </button>

              {/* Tabla de Indicadores */}
              <button
                onClick={() => {
                  setActiveTab('indicadores');
                  setIsOpen(false);
                }}
                className={navItemClass(activeTab === 'indicadores')}
              >
                <Table2 className="w-5 h-5 text-emerald-400" />
                <span className="flex-1 text-left">Tabla de Indicadores</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  12/12
                </span>
              </button>
            </div>
          </div>

          {/* Group 2: OPERACIONES & SOPORTE */}
          <div>
            <h3 className="mb-2.5 ml-3 text-xs font-bold uppercase tracking-wider text-[#8A99AD]">
              OPERACIONES & SOPORTE
            </h3>

            <div className="flex flex-col gap-1">
              {/* Top 5 Casuísticas */}
              <button
                onClick={() => {
                  setActiveTab('casuisticas');
                  setIsOpen(false);
                }}
                className={navItemClass(activeTab === 'casuisticas')}
              >
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <span className="flex-1 text-left">Top 5 Casuísticas</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  Pareto
                </span>
              </button>

              {/* Incidentes & Requerimientos */}
              <button
                onClick={() => {
                  setActiveTab('incidentes');
                  setIsOpen(false);
                }}
                className={navItemClass(activeTab === 'incidentes')}
              >
                <CheckSquare className="w-5 h-5 text-purple-400" />
                <span className="flex-1 text-left">Incidentes & Reqs</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                  54 Inc
                </span>
              </button>
            </div>
          </div>

          {/* Group 3: MODO DE EVALUACIÓN */}
          <div>
            <h3 className="mb-2.5 ml-3 text-xs font-bold uppercase tracking-wider text-[#8A99AD]">
              CRITERIO CONTRACTUAL
            </h3>

            <div className="bg-[#24303F] rounded-lg p-3 space-y-2 border border-[#2E3A4B]">
              <div className="text-[11px] text-[#8A99AD] font-medium flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-400" />
                <span>Aplicación de Excepciones:</span>
              </div>

              <div className="grid grid-cols-3 gap-1 p-1 bg-[#1C2434] rounded-md text-xs font-semibold">
                <button
                  onClick={() => setExceptionMode('sin')}
                  className={`py-1 rounded transition-colors cursor-pointer text-center ${
                    exceptionMode === 'sin'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-[#8A99AD] hover:text-white'
                  }`}
                  title="Sin aplicación de excepciones (Bruto)"
                >
                  Sin
                </button>
                <button
                  onClick={() => setExceptionMode('con')}
                  className={`py-1 rounded transition-colors cursor-pointer text-center ${
                    exceptionMode === 'con'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-[#8A99AD] hover:text-white'
                  }`}
                  title="Con aplicación de excepciones (Ajustado)"
                >
                  Con
                </button>
                <button
                  onClick={() => setExceptionMode('comparativa')}
                  className={`py-1 rounded transition-colors cursor-pointer text-center ${
                    exceptionMode === 'comparativa'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-[#8A99AD] hover:text-white'
                  }`}
                  title="Comparativa ambas modalidades"
                >
                  Ambas
                </button>
              </div>

              <p className="text-[10px] text-slate-400 leading-tight pt-1">
                Septiembre no requirió excepciones para cumplir al 100%.
              </p>
            </div>
          </div>

          {/* Group 4: ACCIONES */}
          <div>
            <h3 className="mb-2.5 ml-3 text-xs font-bold uppercase tracking-wider text-[#8A99AD]">
              HERRAMIENTAS
            </h3>

            <div className="flex flex-col gap-1">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 font-medium text-sm text-[#DEE4EE] hover:bg-[#333A48]/60 hover:text-white transition-colors cursor-pointer"
              >
                <Printer className="w-5 h-5 text-slate-400" />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Compliance Badge */}
        <div className="mt-auto p-4 border-t border-[#2E3A4B]/60 bg-[#161D2A]">
          <div className="rounded-lg bg-[#24303F] p-3 border border-[#2E3A4B]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                100% Acuerdos en Meta
              </span>
            </div>
            <p className="text-[11px] text-[#8A99AD] leading-relaxed">
              Corte Oficial: 01 al 15 de Septiembre 2026. Cero penalizaciones.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
