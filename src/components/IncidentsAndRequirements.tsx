import React, { useState } from 'react';
import {
  AlertOctagon,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  Info,
  Network,
  Laptop,
  Mail,
  Printer,
  Database,
  Globe,
  AppWindow,
} from 'lucide-react';
import {
  MDA_WEEKLY_COMPARISONS,
  INCIDENT_CLASSIFICATIONS,
  REQUIREMENT_STATUS,
  REQUIREMENT_DETAILS,
  EXECUTIVE_OBSERVATIONS,
} from '../data/reportData';

export const IncidentsAndRequirements: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'incidentes' | 'requerimientos' | 'evolucion'>('incidentes');

  const totalIncidents = INCIDENT_CLASSIFICATIONS.reduce((acc, i) => acc + i.cases, 0);

  const getIncidentIcon = (category: string) => {
    switch (category) {
      case 'FALLA CORREO EXCHANGE':
        return <Mail className="w-4 h-4 text-blue-500" />;
      case 'IMPRESORA LEXMARK':
        return <Printer className="w-4 h-4 text-slate-500" />;
      case 'AS400':
        return <Database className="w-4 h-4 text-amber-700" />;
      case 'FALLA PÁGINA':
        return <Globe className="w-4 h-4 text-orange-500" />;
      case 'FALLA APLICACIONES':
        return <AppWindow className="w-4 h-4 text-emerald-500" />;
      case 'FALLA MICROSOFT OFFICE 2010 PROFESSIONAL':
        return <Layers className="w-4 h-4 text-yellow-600" />;
      case 'FALLA EQUIPO':
        return <Laptop className="w-4 h-4 text-slate-400" />;
      default:
        return <AlertOctagon className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-tab Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Gestión de Mesa de Ayuda (MDA) - Septiembre</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Incidentes, Requerimientos y Evolución Semanal
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Desglose de tipologías de incidentes, peticiones de servicio y comparativa de desempeño semanal.
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveSubTab('incidentes')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'incidentes'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clasificación Incidentes ({totalIncidents})
            </button>
            <button
              onClick={() => setActiveSubTab('requerimientos')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'requerimientos'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Requerimientos ({REQUIREMENT_STATUS.total})
            </button>
            <button
              onClick={() => setActiveSubTab('evolucion')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubTab === 'evolucion'
                  ? 'bg-white text-red-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Comparativa Semanal (1-8 vs 9-15)
            </button>
          </div>
        </div>
      </div>

      {/* Subtab 1: Clasificación de Incidentes (Slide 6) */}
      {activeSubTab === 'incidentes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Incident Bars */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Clasificación de Incidentes MDA (Mes Actual)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Total de 54 incidentes registrados en el corte. Cumplimiento SLO: <strong>100%</strong>
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                  54 de 54 Solucionados en Plazo
                </span>
              </div>

              <div className="space-y-4">
                {INCIDENT_CLASSIFICATIONS.map((inc) => {
                  const maxIncidents = 20;
                  const pctWidth = (inc.cases / maxIncidents) * 100;

                  return (
                    <div
                      key={inc.category}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2.5">
                          <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
                            {getIncidentIcon(inc.category)}
                          </div>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {inc.category}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-xs">
                          <span className="font-mono font-black text-slate-900 text-sm">
                            {inc.cases} {inc.cases === 1 ? 'caso' : 'casos'}
                          </span>
                          <span
                            className="font-bold px-2 py-0.5 rounded-md text-white"
                            style={{ backgroundColor: inc.color }}
                          >
                            {inc.percentageDisplay}
                          </span>
                        </div>
                      </div>

                      {/* Visual Bar */}
                      <div className="w-full bg-slate-200/80 h-4 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${pctWidth}%`,
                            backgroundColor: inc.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Official Slide Observation */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  Observación Oficial del Informe
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {EXECUTIVE_OBSERVATIONS.incidents}
                </p>
              </div>
            </div>

            {/* Right 1 Col: Incident Stats & Concentration */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Concentración de Incidentes
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/80">
                    <span className="text-blue-900 font-bold block mb-0.5">
                      1. Falla Correo Exchange (18 casos - 33,3%)
                    </span>
                    <p className="text-slate-600 text-2xs leading-relaxed">
                      Representa 1 de cada 3 incidentes. Principal causa de disrupción en puestos de trabajo.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                    <span className="text-slate-900 font-bold block mb-0.5">
                      2. Impresoras Lexmark (12 casos - 22,2%)
                    </span>
                    <p className="text-slate-600 text-2xs leading-relaxed">
                      Problemas de colas de impresión y conectividad en sucursales y áreas centrales.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80">
                    <span className="text-amber-900 font-bold block mb-0.5">
                      3. Plataforma AS400 (7 casos - 13,0%)
                    </span>
                    <p className="text-slate-600 text-2xs leading-relaxed">
                      Incidentes en sesiones de emulador bancario y bloqueos de terminal.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-2xs text-slate-500">
                  Top 3 incidentes suman el <strong>68,5%</strong> de las fallas totales.
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 shadow-2xs">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Nivel de Cumplimiento SLO</span>
                </div>
                <div className="text-3xl font-black text-emerald-950 my-2">
                  100%
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Todos los 54 incidentes reportados fueron escalados y cumplidos dentro del acuerdo de nivel operativo sin vencimientos.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Requerimientos MDA (Slide 7) */}
      {activeSubTab === 'requerimientos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Breakdown (Casos Cumplidos vs Vencidos) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-slate-600">
                Estatus de Cumplimiento Requerimientos
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-blue-900">
                      Caso No Vencido (Cumplido)
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                      {REQUIREMENT_STATUS.noVencidosPct}%
                    </span>
                  </div>
                  <div className="text-2xl font-black text-blue-950">
                    {REQUIREMENT_STATUS.noVencidos}{' '}
                    <span className="text-xs text-blue-800 font-normal">casos</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-orange-900">
                      Caso Vencido (Fuera de SLA)
                    </span>
                    <span className="text-xs font-bold text-orange-700 bg-white px-2 py-0.5 rounded-md border border-orange-200">
                      {REQUIREMENT_STATUS.vencidosPct}%
                    </span>
                  </div>
                  <div className="text-2xl font-black text-orange-950">
                    {REQUIREMENT_STATUS.vencidos}{' '}
                    <span className="text-xs text-orange-800 font-normal">casos</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex justify-between font-semibold">
                  <span className="text-slate-600">Total Requerimientos:</span>
                  <span className="text-slate-900">{REQUIREMENT_STATUS.total} casos</span>
                </div>
              </div>

              <div className="mt-4 text-2xs text-slate-500">
                *Meta de cumplimiento SLO &ge; 95,00%. Resultado actual: <strong>96,92%</strong> (Cumple con holgura).
              </div>
            </div>

            {/* Requerimientos by Type (VPN vs Config Software) */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Detalle de Requerimientos por Categoría
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Clasificación específica de peticiones tramitadas durante el corte del 1 al 15 de septiembre.
              </p>

              <div className="space-y-5">
                {REQUIREMENT_DETAILS.map((req) => (
                  <div
                    key={req.type}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/60"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-md bg-white border border-slate-200">
                          {req.type === 'VPN' ? (
                            <Network className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Laptop className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                        <span className="font-black text-slate-900 text-sm">
                          {req.type}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-mono font-black text-slate-900 text-sm">
                          {req.cases} casos
                        </span>
                        <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                          {req.percentageDisplay}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-200 h-6 rounded-lg overflow-hidden relative">
                      <div
                        className={`h-full rounded-lg flex items-center justify-end pr-3 font-bold text-white text-xs ${
                          req.type === 'VPN' ? 'bg-blue-600' : 'bg-purple-600'
                        }`}
                        style={{ width: `${Math.max(req.percentage, 8)}%` }}
                      >
                        {req.cases}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Observation */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  Observación Oficial del Informe
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {EXECUTIVE_OBSERVATIONS.requirements}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Comparativa Semanal MDA (Slide 3) */}
      {activeSubTab === 'evolucion' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Comparativa Semanal: Septiembre 1 - 8 vs Septiembre 9 - 15
                </h3>
                <p className="text-xs text-slate-500">
                  Evaluación de variación de volumen de tickets y cumplimiento en las dos semanas de corte.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                Meta General &ge; 95%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MDA_WEEKLY_COMPARISONS.map((comp) => {
                const diff = comp.week2.indicador - comp.week1.indicador;
                const isPositive = diff >= 0;

                return (
                  <div
                    key={comp.name}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-900 leading-tight">
                          {comp.name}
                        </span>
                        <span className="text-3xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          Meta {comp.meta}
                        </span>
                      </div>

                      {/* Week 1 vs Week 2 stats */}
                      <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-3xs text-slate-500 block uppercase font-bold">
                            Semana 1 (1-8)
                          </span>
                          <div className="text-base font-black text-slate-900 mt-1">
                            {comp.week1.indicadorDisplay}
                          </div>
                          <span className="text-3xs text-slate-400 block mt-0.5">
                            {comp.week1.numerador} / {comp.week1.denominador} {comp.unit}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-red-50/50 border border-red-100">
                          <span className="text-3xs text-red-700 block uppercase font-bold">
                            Semana 2 (9-15)
                          </span>
                          <div className="text-base font-black text-red-950 mt-1">
                            {comp.week2.indicadorDisplay}
                          </div>
                          <span className="text-3xs text-slate-500 block mt-0.5">
                            {comp.week2.numerador} / {comp.week2.denominador} {comp.unit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Variación Semanal:</span>
                      <span
                        className={`font-bold ${
                          diff > 0
                            ? 'text-emerald-600'
                            : diff < 0
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}
                      >
                        {diff > 0 ? `+${diff.toFixed(2)}%` : `${diff.toFixed(2)}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official Slide 3 Observation */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                Observación Oficial del Informe (Slide 3)
              </div>
              <p className="text-slate-600 leading-relaxed">
                {EXECUTIVE_OBSERVATIONS.mda}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
