import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Menu,
  Bell,
  MessageSquare,
  ChevronDown,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import { DavibankLogo } from './DavibankLogo';

interface TailAdminHeaderProps {
  onToggleSidebar: () => void;
  exceptionMode: 'sin' | 'con' | 'comparativa';
  setExceptionMode: (mode: 'sin' | 'con' | 'comparativa') => void;
  onNavigateTab: (tab: string) => void;
}

export const TailAdminHeader: React.FC<TailAdminHeaderProps> = ({
  onToggleSidebar,
  exceptionMode,
  setExceptionMode,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchItems = [
    { title: 'Llamadas Abandonadas (0,18% - Meta <= 4%)', tab: 'indicadores', category: 'SLA Telefónico' },
    { title: 'Tiempo de Respuesta ASA (96,41% - Meta >= 92%)', tab: 'indicadores', category: 'SLA Telefónico' },
    { title: 'Solución en Primer Nivel (95,78% - Meta >= 95%)', tab: 'indicadores', category: 'SLA Operativo' },
    { title: 'Gestión de Tickets WEB (100,00% - Meta >= 95%)', tab: 'indicadores', category: 'SLO Mesa' },
    { title: 'Soporte en Sitio - Incidentes (99,29% - Meta >= 95%)', tab: 'indicadores', category: 'SLA Sitio' },
    { title: 'Soporte en Sitio - Peticiones (99,25% - Meta >= 95%)', tab: 'indicadores', category: 'SLA Sitio' },
    { title: 'Calidad en Categorización (97,00% - Meta >= 95%)', tab: 'indicadores', category: 'SLA Calidad' },
    { title: 'Encuesta Satisfacción Usuarios (96,40% - Meta >= 90%)', tab: 'indicadores', category: 'SLA Calidad' },
    { title: 'Causa: Desbloqueo Usuario de Red (431 casos)', tab: 'casuisticas', category: 'Top 1 Demanda' },
    { title: 'Causa: Desbloqueo Cuenta AS400 (363 casos)', tab: 'casuisticas', category: 'Top 2 Demanda' },
    { title: 'Causa: Oportunidad en Red / Dominio (239 casos)', tab: 'casuisticas', category: 'Top 4 Demanda' },
    { title: 'Distribución Telefónica & Colas (3.372 llamadas)', tab: 'telefonia', category: 'Colas' },
    { title: 'Incidentes y Requerimientos Quincena (54 incs)', tab: 'incidentes', category: 'Gestión Casos' },
  ];

  const filteredSearch = searchQuery.trim() === ''
    ? []
    : searchItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <header className="sticky top-0 z-30 flex w-full bg-white border-b border-[#E2E8F0] shadow-xs">
      <div className="flex flex-grow items-center justify-between px-4 py-3.5 sm:px-6 md:px-8">
        {/* Left: Mobile Toggle & Search Bar */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
          <button
            aria-label="Abrir Menú Lateral"
            onClick={onToggleSidebar}
            className="block rounded-sm border border-[#E2E8F0] bg-white p-1.5 shadow-2xs hover:bg-slate-50 lg:hidden cursor-pointer"
          >
            <Menu className="w-5 h-5 text-[#64748B]" />
          </button>

          {/* Interactive Search Input */}
          <div className="relative w-full max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#64748B] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar indicador, cola, casuística o SLA..."
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pl-9.5 pr-8 py-2 text-xs sm:text-sm text-[#1C2434] outline-hidden focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500 transition-all placeholder:text-[#94A3B8]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick search dropdown */}
            {filteredSearch.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden z-50 max-h-72 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 bg-slate-50 border-b border-slate-100">
                  {filteredSearch.length} Resultados encontrados
                </div>
                {filteredSearch.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigateTab(item.tab);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-red-50/70 border-b border-slate-100 last:border-0 flex items-center justify-between text-xs transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-red-600">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Sección: {item.category}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-red-500">
                      Ir &rarr;
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Toggle pill: Sin / Con Excepción (matching the sun/moon toggle in TailAdmin) */}
          <div className="hidden sm:flex items-center space-x-2 bg-[#F1F5F9] p-1 rounded-full border border-slate-200 text-xs">
            <button
              onClick={() => setExceptionMode('sin')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                exceptionMode === 'sin'
                  ? 'bg-white text-red-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Sin Excepción"
            >
              Sin Excepción
            </button>
            <button
              onClick={() => setExceptionMode('con')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                exceptionMode === 'con'
                  ? 'bg-white text-red-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Con Excepción"
            >
              Con Excepción
            </button>
          </div>

          {/* Notification icon button with red dot */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:text-[#1C2434] hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notificaciones de Cumplimiento"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2.5 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-800">Alertas de Gestión</span>
                  <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    100% SLA
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-slate-700">
                    <p className="font-semibold text-emerald-900">12 de 12 SLAs Cumplidos</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Primera quincena de septiembre cerrada con cero penalizaciones contractuales.
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                    <p className="font-semibold text-slate-900">Abandono en 0,18%</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Margen favorable de 3,82% respecto a la meta máxima tolerada (4,00%).
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>

          {/* Direct print action button */}
          <button
            onClick={() => window.print()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:text-[#1C2434] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Imprimir / Exportar a PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* User / Committee Profile (matching TailAdmin top right) */}
          <div className="relative border-l border-[#E2E8F0] pl-3 sm:pl-4">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 text-white font-bold text-xs shadow-xs">
                <span>DV</span>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>

              <div className="hidden text-left md:block">
                <span className="block text-xs font-bold text-[#1C2434] group-hover:text-red-600 transition-colors">
                  Comité Davibank
                </span>
                <span className="block text-[11px] text-[#64748B] font-medium">
                  Operaciones & TI
                </span>
              </div>

              <ChevronDown className="hidden md:block w-3.5 h-3.5 text-[#64748B]" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 text-xs">
                <div className="pb-2 mb-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900">Comité Ejecutivo</p>
                  <p className="text-[11px] text-slate-500">Vicepresidencia de TI</p>
                </div>
                <button
                  onClick={() => {
                    onNavigateTab('portada');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 font-medium cursor-pointer"
                >
                  Ver Portada Oficial
                </button>
                <button
                  onClick={() => {
                    onNavigateTab('resumen');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 font-medium cursor-pointer"
                >
                  Ver Dashboard Principal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
