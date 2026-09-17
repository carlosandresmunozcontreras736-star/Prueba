import React, { useState } from 'react';
import {
  BarChart3,
  KeyRound,
  ShieldCheck,
  Search,
  Settings,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { TOP_DEMAND_CAUSES, EXECUTIVE_OBSERVATIONS } from '../data/reportData';

export const DemandTopCauses: React.FC = () => {
  const [activeCause, setActiveCause] = useState<number | null>(1);

  const totalCases = TOP_DEMAND_CAUSES.reduce((acc, c) => acc + c.cases, 0);

  // Category badge colors
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Cuentas':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Consultas':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Herramientas':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Soporte':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCauseIcon = (cat: string) => {
    switch (cat) {
      case 'Cuentas':
        return <KeyRound className="w-4 h-4 text-amber-600" />;
      case 'Consultas':
        return <Search className="w-4 h-4 text-blue-600" />;
      case 'Herramientas':
        return <Settings className="w-4 h-4 text-purple-600" />;
      case 'Soporte':
        return <HelpCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Análisis de Demanda Mesa de Ayuda (MDA)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Top 5 Causas de Demanda MDA (Septiembre)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Concentración de solicitudes atendidas en Mesa de Ayuda durante el corte del 1 al 15 de septiembre.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-xs flex items-center gap-4">
            <div>
              <span className="text-slate-500 block">Total Solicitudes Top 5:</span>
              <span className="text-lg font-black text-slate-900">
                {totalCases.toLocaleString('es-CO')} casos
              </span>
            </div>
            <div className="h-7 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500 block">Concentración Cuentas:</span>
              <span className="text-lg font-black text-amber-600">
                52,69%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visual: Pareto Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Chart Card (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Distribución de Casos y Tendencia
            </h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-cyan-800" />
                <span className="text-slate-600">Volumen Casos</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-0.5 bg-amber-500" />
                <span className="text-slate-600">Línea de Tendencia</span>
              </div>
            </div>
          </div>

          {/* Bar chart matching Slide 5 */}
          <div className="space-y-4 pt-2">
            {TOP_DEMAND_CAUSES.map((item) => {
              const maxCases = 450; // max scale
              const barWidthPct = (item.cases / maxCases) * 100;
              const isSelected = activeCause === item.rank;

              return (
                <div
                  key={item.rank}
                  onClick={() => setActiveCause(item.rank)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-50 border-red-300 ring-1 ring-red-200'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
                        {getCauseIcon(item.category)}
                      </div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {item.rank}. {item.cause}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold border ${getCategoryBadge(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                      <span className="font-mono font-black text-slate-900 text-sm">
                        {item.cases} casos
                      </span>
                      <span className="font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        {item.percentageDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-900 to-cyan-700 rounded-lg flex items-center justify-end pr-2 transition-all duration-300"
                      style={{ width: `${barWidthPct}%` }}
                    >
                      <span className="text-3xs font-bold text-cyan-100">
                        {item.cases}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Slide Observation */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-red-600" />
              Observación del Informe Oficial
            </div>
            <p className="text-slate-600 leading-relaxed">
              {EXECUTIVE_OBSERVATIONS.causes}
            </p>
          </div>
        </div>

        {/* Right 1 Col: Strategic Automation & Business Opportunity */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-200 p-6 shadow-2xs">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Oportunidad para el Comité</span>
            </div>
            <h4 className="text-base font-black text-slate-900 mb-2">
              Automatización de Desbloqueo de Cuentas
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              Las solicitudes de <strong>Usuario de Red (431)</strong> y <strong>AS400 (363)</strong> suman un total de <strong>794 casos (52,69%)</strong> de la demanda total.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/80 border border-amber-200/60 font-semibold text-slate-800">
                <span>Desbloqueo Red:</span>
                <span className="text-amber-800 font-bold">28,60%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/80 border border-amber-200/60 font-semibold text-slate-800">
                <span>Desbloqueo AS400:</span>
                <span className="text-amber-800 font-bold">24,09%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-600 text-white font-bold">
                <span>Impacto Combinado:</span>
                <span>52,69% de la Mesa</span>
              </div>
            </div>
            <p className="text-2xs text-slate-500 mt-4 leading-normal">
              Recomendación: Implementar bot de autoservicio o portal de auto-recuperación de contraseña con autenticación biométrica o OTP para reducir a la mitad las llamadas recibidas.
            </p>
          </div>

          {/* Consulta Caso note */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              Garantías de Control de Accesos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              La 3ra causa con <strong>305 casos (20,24%)</strong> corresponde a <em>Consulta de Casos</em>, en su mayoría asociadas a garantías y estatus de gestiones previas realizadas por el equipo de Control de Accesos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
