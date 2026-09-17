import React, { useState } from 'react';
import {
  Table,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ShieldAlert,
  ArrowUpDown,
} from 'lucide-react';
import {
  OPERATIONAL_INDICATORS,
  MONTHS,
  EXECUTIVE_OBSERVATIONS,
} from '../data/reportData';
import { OperationalIndicator } from '../types';

interface IndicatorsTableProps {
  exceptionMode: 'sin' | 'con' | 'comparativa';
  setExceptionMode: (mode: 'sin' | 'con' | 'comparativa') => void;
}

export const IndicatorsTable: React.FC<IndicatorsTableProps> = ({
  exceptionMode,
  setExceptionMode,
}) => {
  const [selectedProcess, setSelectedProcess] = useState<string>('todos');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const processes = ['todos', 'Mesa de ayuda', 'Soporte en sitio', 'Calidad'];

  const filteredIndicators = OPERATIONAL_INDICATORS.filter((ind) => {
    const matchesProcess =
      selectedProcess === 'todos' || ind.process === selectedProcess;
    const matchesType =
      selectedType === 'todos' || ind.type === selectedType;
    const matchesSearch =
      ind.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.process.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesProcess && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <Table className="w-3.5 h-3.5" />
              <span>Matriz de Gestión Operativa Davibank 2026</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Detalle Global de Indicadores (Enero - Septiembre 15)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Tablero comparativo de cumplimiento de metas contractuales SLA y objetivos operativos SLO.
            </p>
          </div>

          {/* Exception Mode Tabs */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
            <button
              onClick={() => setExceptionMode('sin')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                exceptionMode === 'sin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sin Excepciones
            </button>
            <button
              onClick={() => setExceptionMode('con')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                exceptionMode === 'con'
                  ? 'bg-white text-red-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Con Excepciones
            </button>
            <button
              onClick={() => setExceptionMode('comparativa')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                exceptionMode === 'comparativa'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vista Comparativa
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar indicador o proceso..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-red-500 w-48 sm:w-60"
              />
            </div>

            {/* Process Filter */}
            <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <span className="text-slate-400 px-1 font-medium">Proceso:</span>
              {processes.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProcess(p)}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                    selectedProcess === p
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p === 'todos' ? 'Todos' : p}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <span className="text-slate-400 px-1 font-medium">Tipo:</span>
              {['todos', 'SLA', 'SLO'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                    selectedType === t
                      ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t === 'todos' ? 'Todos' : t}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Mostrando <strong>{filteredIndicators.length}</strong> de 12 indicadores
          </div>
        </div>
      </div>

      {/* Comparative View Mode (When 'comparativa' is active) */}
      {exceptionMode === 'comparativa' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Comparativo de Impacto: Sin Excepción vs Con Excepción (Corte Septiembre)
              </h3>
              <p className="text-xs text-slate-500">
                Evolución del corte 1-15 Sep y meses clave con afectaciones por factores externos aprobados.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
              0 brechas en Septiembre
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-3xs font-bold border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Proceso</th>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 text-center">Meta</th>
                  <th className="py-2.5 px-3 text-center">Tipo</th>
                  <th className="py-2.5 px-3 text-center bg-slate-100 font-bold">
                    Sin Excep. (Sep 1-15)
                  </th>
                  <th className="py-2.5 px-3 text-center bg-red-50 text-red-900 font-bold">
                    Con Excep. (Sep 1-15)
                  </th>
                  <th className="py-2.5 px-3 text-center">Variación Sep</th>
                  <th className="py-2.5 px-3 text-center">Impacto Histórico Notorio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIndicators.map((ind) => {
                  const sinVal = ind.sinExcepcion['Septiembre'];
                  const conVal = ind.conExcepcion['Septiembre'];
                  const diff = Math.abs(sinVal.value - conVal.value);

                  // Historical callout
                  let historicalNote = 'Comportamiento idéntico';
                  if (ind.id === 'llamadas_abandonadas') {
                    historicalNote = 'Julio: 4,13% (sin) vs 0,62% (con)';
                  } else if (ind.id === 'asa_telefonico') {
                    historicalNote = 'Julio: 84,19% (sin) vs 92,91% (con)';
                  } else if (ind.id === 'requerimientos_mda') {
                    historicalNote = 'Febrero: 93,06% (sin) vs 100% (con)';
                  }

                  return (
                    <tr key={ind.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {ind.process}
                      </td>
                      <td className="py-2.5 px-3 text-slate-900 font-medium">
                        {ind.name}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-700 whitespace-nowrap">
                        {ind.goal}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`px-1.5 py-0.5 rounded-xs font-bold text-3xs ${
                            ind.type === 'SLA'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {ind.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center bg-slate-50 font-bold text-emerald-700">
                        {sinVal.display}
                      </td>
                      <td className="py-2.5 px-3 text-center bg-red-50/50 font-bold text-emerald-700">
                        {conVal.display}
                      </td>
                      <td className="py-2.5 px-3 text-center font-semibold text-slate-500">
                        {diff === 0 ? '0,00%' : `${diff.toFixed(2)}%`}
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-500 text-3xs">
                        {historicalNote}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Full Table: Either Sin Excepción or Con Excepción */}
      {exceptionMode !== 'comparativa' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <h3 className="text-sm font-bold tracking-wide uppercase">
                INDICADORES OPERATIVOS DAVIBANK ({exceptionMode === 'sin' ? 'Sin excepciones' : 'Con excepciones'}) — 2026
              </h3>
            </div>
            <span className="text-xs text-slate-300 font-mono">
              Año 2026 | Corte Sep: 1 al 15
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-red-800 text-white font-bold text-3xs uppercase tracking-wider">
                  <th className="py-2 px-3 border border-red-900">PROCESO</th>
                  <th className="py-2 px-3 border border-red-900 min-w-[200px]">INDICADOR</th>
                  <th className="py-2 px-2 border border-red-900 text-center">Meta</th>
                  <th className="py-2 px-2 border border-red-900 text-center">Tipo</th>
                  {MONTHS.map((m) => (
                    <th
                      key={m}
                      className={`py-2 px-2 border border-red-900 text-center whitespace-nowrap ${
                        m === 'Septiembre' ? 'bg-red-950 font-black ring-1 ring-white/30' : ''
                      }`}
                    >
                      {m === 'Septiembre' ? 'Septiembre (1-15)' : m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-sans">
                {filteredIndicators.map((ind, idx) => {
                  const valuesSource =
                    exceptionMode === 'sin' ? ind.sinExcepcion : ind.conExcepcion;

                  return (
                    <tr
                      key={ind.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                    >
                      <td className="py-2.5 px-3 font-semibold text-slate-900 border-r border-slate-200 whitespace-nowrap bg-slate-50/50">
                        {ind.process}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-900 border-r border-slate-200">
                        {ind.name}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-slate-700 border-r border-slate-200 whitespace-nowrap">
                        {ind.goal}
                      </td>
                      <td className="py-2.5 px-2 text-center border-r border-slate-200">
                        <span
                          className={`px-1.5 py-0.5 rounded-xs font-bold text-3xs ${
                            ind.type === 'SLA'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-purple-50 text-purple-700 border border-purple-200'
                          }`}
                        >
                          {ind.type}
                        </span>
                      </td>

                      {/* Monthly Values */}
                      {MONTHS.map((m) => {
                        const monthData = valuesSource[m];
                        if (!monthData) return <td key={m} className="border-r border-slate-200" />;

                        const isCompliant = monthData.compliant;
                        const isSept = m === 'Septiembre';

                        return (
                          <td
                            key={m}
                            className={`py-2.5 px-2 text-center font-mono text-2xs border-r border-slate-200 transition-colors ${
                              isCompliant
                                ? isSept
                                  ? 'bg-emerald-100 text-emerald-950 font-black ring-1 ring-emerald-400'
                                  : 'bg-emerald-50/80 text-emerald-900'
                                : 'bg-red-200 text-red-950 font-bold'
                            }`}
                          >
                            {monthData.display}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Notes */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-200 border border-emerald-400" />
                <span>Cumple Meta establecida</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-xs bg-red-200 border border-red-400" />
                <span>Incumple Meta (&lt; SLA / SLO)</span>
              </div>
            </div>

            <div className="text-slate-500 text-3xs sm:text-2xs">
              *Metas SLA contractuales auditadas con penalización | Metas SLO operativas internas de nivel de servicio
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
