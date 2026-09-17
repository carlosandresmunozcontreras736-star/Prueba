import React from 'react';
import {
  FileText,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Layers,
  ArrowRight,
  TrendingUp,
  Printer,
  Building2,
  Users,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { DavibankLogo } from './DavibankLogo';

interface CoverPageProps {
  onNavigateTab: (tabId: string) => void;
  exceptionMode: 'sin' | 'con' | 'comparativa';
}

export const CoverPage: React.FC<CoverPageProps> = ({
  onNavigateTab,
  exceptionMode,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const chapters = [
    {
      id: 'resumen',
      number: '01',
      title: 'Resumen Ejecutivo & Dictamen',
      desc: 'Cumplimiento global del 100% de los 12 indicadores y síntesis para el Comité.',
      stat: '100% Cumplido',
      badge: 'SLA / SLO',
    },
    {
      id: 'telefonia',
      number: '02',
      title: 'Telefonía & Capacidad de Colas',
      desc: '3.387 llamadas ofrecidas, 0,18% abandono y análisis del pico del 9 de septiembre.',
      stat: '0,18% Abandono',
      badge: 'Meta ≤ 4,00%',
    },
    {
      id: 'indicadores',
      number: '03',
      title: 'Matriz de Indicadores (SLA / SLO)',
      desc: 'Histórico Enero–Septiembre con comparativa Con Excepción vs Sin Excepción.',
      stat: '12 Indicadores',
      badge: 'Auditado',
    },
    {
      id: 'casuisticas',
      number: '04',
      title: 'Top 5 Casuísticas & Demanda MDA',
      desc: 'Concentración del 52,69% en cuentas de Red y AS400 y propuesta de automatización.',
      stat: '794 Casos Clave',
      badge: 'Oportunidad',
    },
    {
      id: 'incidentes',
      number: '05',
      title: 'Incidentes, Requerimientos & Semanas',
      desc: '54 incidentes (100% SLO), 130 requerimientos (96,92%) y comparativa semana 1 vs 2.',
      stat: '96,92% Oportunidad',
      badge: 'Operativo',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Formal Executive Cover Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Top Decorative Corporate Accents */}
        <div className="h-2.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-slate-900" />

        {/* Subtle Watermark & Background styling */}
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-red-50/40 pointer-events-none blur-2xl" />
        <div className="absolute -left-16 -bottom-16 w-96 h-96 rounded-full bg-slate-100/50 pointer-events-none blur-2xl" />

        <div className="relative p-6 sm:p-10 lg:p-14">
          {/* Header row: Logo & Corporate badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div>
              <DavibankLogo size="lg" className="mb-2" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest pl-1">
                Vicepresidencia de Tecnología & Operaciones
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span>Documento Oficial de Comité</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-xs font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Corte: 01 - 15 Septiembre 2026</span>
              </span>
            </div>
          </div>

          {/* Title and Executive Banner */}
          <div className="py-10 max-w-4xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-3">
              <Award className="w-4 h-4" />
              <span>Informe de Desempeño Operativo & Acuerdos de Servicio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Informe de Gestión para el Comité de Davibank
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Evaluación integral del rendimiento operativo de la <strong>Mesa de Ayuda (MDA)</strong>,{' '}
              <strong>Soporte en Sitio</strong> y <strong>Calidad</strong> durante el corte oficial de la primera quincena de septiembre de 2026. Análisis comparativo de cumplimiento de metas SLA contractuales y objetivos SLO de atención.
            </p>

            {/* High-level Achievement Banner */}
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-50 via-emerald-50/60 to-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Dictamen de Cumplimiento: 100% Conforme
                  </h4>
                  <p className="text-xs text-emerald-800">
                    En el corte de septiembre todos los indicadores cumplen o superan los niveles exigidos (0 brechas detectadas).
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 text-xs font-bold text-emerald-900 bg-white/90 px-3 py-1.5 rounded-lg border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>12 de 12 Indicadores Cumplidos</span>
              </div>
            </div>
          </div>

          {/* Key Executive KPIs Grid (Cover Highlights) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs sm:text-2xs font-bold uppercase tracking-wider text-slate-500 block">
                Efectividad Telefónica
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                99,56%
              </div>
              <span className="text-3xs text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                3.372 llamadas atendidas
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs sm:text-2xs font-bold uppercase tracking-wider text-slate-500 block">
                Nivel de Abandono
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                0,18%
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">
                Meta contractual: &le; 4,00% SLA
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs sm:text-2xs font-bold uppercase tracking-wider text-slate-500 block">
                Nivel de Servicio (ASA)
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                96,41%
              </div>
              <span className="text-3xs text-slate-500 block mt-0.5">
                Meta contractual: &ge; 92,00% SLA
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-3xs sm:text-2xs font-bold uppercase tracking-wider text-slate-500 block">
                Resolutividad Incidentes
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                100%
              </div>
              <span className="text-3xs text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                54 de 54 dentro de tiempo
              </span>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="btn-entrar-resumen"
                onClick={() => onNavigateTab('resumen')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-500/20 transition-all cursor-pointer"
              >
                <span>Acceder al Resumen Ejecutivo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-entrar-indicadores"
                onClick={() => onNavigateTab('indicadores')}
                className="inline-flex items-center space-x-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all cursor-pointer"
              >
                <span>Ver Tabla de Indicadores</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <button
              id="btn-imprimir-portada"
              onClick={handlePrint}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Imprimir / Exportar Portada Oficial</span>
            </button>
          </div>
        </div>
      </div>

      {/* Index of Chapters (Índice de Secciones del Informe) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Estructura & Capítulos del Informe
            </h3>
            <p className="text-xs text-slate-500">
              Haga clic en cualquiera de las secciones para acceder directamente a los datos y análisis detallados.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            5 Capítulos Oficiales
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onNavigateTab(ch.id)}
              className="group p-5 rounded-xl border border-slate-200 hover:border-red-300 bg-white hover:bg-red-50/20 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                    Capítulo {ch.number}
                  </span>
                  <span className="text-3xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {ch.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                  {ch.title}
                </h4>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-800">
                  {ch.stat}
                </span>
                <span className="text-red-600 font-semibold text-xs inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Ver capítulo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Metadata & Signing Footer Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Entidad Emisora
            </span>
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <Building2 className="w-4 h-4 text-red-600" />
              <span>DAVIBANK S.A.</span>
            </div>
            <p className="text-slate-500 text-2xs mt-0.5">
              Dirección de Soporte a Usuarios & Calidad
            </p>
          </div>

          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Destinatario
            </span>
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <Users className="w-4 h-4 text-slate-600" />
              <span>Comité de Tecnología y Operaciones</span>
            </div>
            <p className="text-slate-500 text-2xs mt-0.5">
              Sesión de Seguimiento Mensual de SLAs
            </p>
          </div>

          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Período Evaluado
            </span>
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>01 al 15 de Septiembre de 2026</span>
            </div>
            <p className="text-slate-500 text-2xs mt-0.5">
              Primer corte quincenal auditado
            </p>
          </div>

          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
              Estatus del Dictamen
            </span>
            <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Aprobado / Conforme a SLA</span>
            </div>
            <p className="text-slate-500 text-2xs mt-0.5">
              Sin observaciones ni penalizaciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
