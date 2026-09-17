import React, { useState } from 'react';
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOff,
  Clock,
  Timer,
  Info,
  AlertCircle,
  TrendingDown,
  Calendar,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import {
  TELEPHONY_METRICS,
  DAILY_QUEUE_WAITS,
  EXECUTIVE_OBSERVATIONS,
} from '../data/reportData';

export const TelephonySection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(9); // default to incident day 9

  // Max wait seconds for chart scaling (max is 9 seconds)
  const maxWait = Math.max(...DAILY_QUEUE_WAITS.map((d) => d.waitDurationSeconds));

  const activeDayData = DAILY_QUEUE_WAITS.find((d) => d.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Center & Soporte Telefónico Davibank</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Relación de Tendencia Telefónica (Corte 1 al 15 Sep)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Monitoreo del tráfico entrante, retención y nivel de servicio en línea para usuarios del banco.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-xs">
            <div>
              <span className="text-slate-500 block">Estatus SLA Abandono:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                0,18% vs Meta &le; 4,00%
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500 block">Estatus SLA Nivel Servicio:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                96,41% vs Meta &ge; 92,00%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Relación de Tendencia: Visual Flow (Faithful to Slide 2) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-slate-600">
          Flujo de Llamadas en Mesa de Ayuda
        </h3>

        {/* 3 Main Volume Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Block 1: Llamadas Ofrecidas */}
          <div className="relative rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 shadow-xs flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
                Llamadas Ofrecidas
              </span>
              <PhoneIncoming className="w-5 h-5 text-orange-200" />
            </div>
            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black tracking-tight">
                {TELEPHONY_METRICS.llamadasOfrecidas.toLocaleString('es-CO')}
              </div>
              <div className="text-xs text-orange-100 font-medium mt-1">
                Total de solicitudes telefónicas ingresadas
              </div>
            </div>
            <div className="text-xs bg-orange-700/40 border border-orange-400/30 rounded-lg px-3 py-1.5 inline-flex items-center">
              100% Volumen Canal Telefónico
            </div>
          </div>

          {/* Block 2: Llamadas Atendidas */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 text-white p-6 shadow-xs flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Llamadas Atendidas
              </span>
              <PhoneCall className="w-5 h-5 text-slate-300" />
            </div>
            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black tracking-tight">
                {TELEPHONY_METRICS.llamadasAtendidas.toLocaleString('es-CO')}
              </div>
              <div className="text-sm text-emerald-300 font-bold mt-1">
                ({TELEPHONY_METRICS.llamadasAtendidasPct.toString().replace('.', ',')}%)
              </div>
            </div>
            <div className="text-xs bg-slate-800/50 border border-slate-500/30 rounded-lg px-3 py-1.5 inline-flex items-center text-slate-200">
              Gestión efectiva por asesores MDA
            </div>
          </div>

          {/* Block 3: Llamadas Abandonadas */}
          <div className="relative rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 p-6 shadow-xs flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Llamadas Abandonadas
              </span>
              <PhoneOff className="w-5 h-5 text-amber-900" />
            </div>
            <div className="my-6">
              <div className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                {TELEPHONY_METRICS.llamadasAbandonadas}
              </div>
              <div className="text-xs font-bold text-amber-950 bg-amber-200/80 px-2.5 py-1 rounded-md mt-1 inline-block">
                ({TELEPHONY_METRICS.llamadasAbandonadasPenalizables} PENALIZABLES)
              </div>
            </div>
            <div className="text-xs text-amber-900 font-medium">
              9 no penalizables (&le; umbral de abandono)
            </div>
          </div>
        </div>

        {/* Chevron Chevron/Indicators Ribbon below */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Item 1: Promedio abandono */}
          <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-slate-200 text-slate-700">
              <PhoneOff className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">
                Promedio de Abandono
              </span>
              <span className="text-xl font-black text-slate-900">
                0,18%
              </span>
              <span className="text-xs text-emerald-700 font-bold block">
                Meta &le; 4% SLA
              </span>
            </div>
          </div>

          {/* Item 2: Promedio tiempo en llamada */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-amber-200/70 text-amber-900">
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-amber-800 block">
                Promedio Tiempo en Llamada
              </span>
              <span className="text-xl font-black text-amber-950">
                08:48 min
              </span>
              <span className="text-xs text-amber-800 block">
                Duración de interacción
              </span>
            </div>
          </div>

          {/* Item 3: Tiempo de espera en línea */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-orange-200/70 text-orange-900">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-orange-800 block">
                Tiempo de Espera en Línea
              </span>
              <span className="text-xl font-black text-orange-950">
                00:03 Seg
              </span>
              <span className="text-xs text-orange-800 block">
                Atención casi inmediata
              </span>
            </div>
          </div>

          {/* Item 4: Promedio nivel de servicio */}
          <div className="bg-red-50 rounded-xl p-4 border border-red-200 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-red-200/70 text-red-900">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-red-800 block">
                Nivel de Servicio (ASA)
              </span>
              <span className="text-xl font-black text-red-900">
                96,41%
              </span>
              <span className="text-xs text-emerald-700 font-bold block">
                Meta &ge; 92% SLA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Picos en Promedios de Tiempo en Espera en Cola (Slide 4) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" />
              Identificador de Picos en Promedios de Tiempo en Espera en Cola
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tiempo promedio diario en cola telefónica (1 al 15 de Septiembre 2026)
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-red-400" />
              <span className="text-slate-600">Masivo con Impacto Alto</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-xs bg-blue-600" />
              <span className="text-slate-600">Masivo con Impacto Bajo</span>
            </div>
          </div>
        </div>

        {/* Interactive Line & Peak Chart */}
        <div className="relative pt-6 pb-2">
          {/* Grid lines */}
          <div className="h-64 flex flex-col justify-between text-xs text-slate-400 border-b border-slate-200 pl-8 relative">
            <div className="flex items-center w-full">
              <span className="absolute left-0 text-slate-400 text-2xs">0:10</span>
              <div className="w-full border-b border-dashed border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="absolute left-0 text-slate-400 text-2xs">0:08</span>
              <div className="w-full border-b border-dashed border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="absolute left-0 text-slate-400 text-2xs">0:06</span>
              <div className="w-full border-b border-dashed border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="absolute left-0 text-slate-400 text-2xs">0:04</span>
              <div className="w-full border-b border-dashed border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="absolute left-0 text-slate-400 text-2xs">0:02</span>
              <div className="w-full border-b border-dashed border-slate-200" />
            </div>
            <div className="flex items-center w-full">
              <span className="absolute left-0 text-slate-400 text-2xs">0:00</span>
              <div className="w-full border-b border-slate-300" />
            </div>

            {/* SVG Trend Line */}
            <div className="absolute inset-0 left-8 right-0 bottom-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1400 256">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Calculate points */}
                {(() => {
                  const points = DAILY_QUEUE_WAITS.map((d, i) => {
                    const x = (i / (DAILY_QUEUE_WAITS.length - 1)) * 1400;
                    // max is 10 seconds scale (256px)
                    const y = 256 - (d.waitDurationSeconds / 10) * 256;
                    return `${x},${y}`;
                  }).join(' ');

                  const areaPoints = `0,256 ${points} 1400,256`;

                  return (
                    <>
                      <polygon points={areaPoints} fill="url(#lineGrad)" />
                      <polyline
                        points={points}
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Interactive Data Nodes on Chart */}
            <div className="absolute inset-0 left-8 right-0 flex justify-between items-end">
              {DAILY_QUEUE_WAITS.map((dayData, idx) => {
                const heightPct = (dayData.waitDurationSeconds / 10) * 100;
                const isSelected = selectedDay === dayData.day;
                const hasIncident = !!dayData.incidentTag;

                return (
                  <div
                    key={dayData.day}
                    className="flex flex-col items-center justify-end h-full relative cursor-pointer group"
                    style={{ width: `${100 / DAILY_QUEUE_WAITS.length}%` }}
                    onClick={() => setSelectedDay(dayData.day)}
                  >
                    {/* Floating Value Tag */}
                    <div
                      className={`absolute text-2xs font-bold px-1.5 py-0.5 rounded-sm shadow-2xs border transition-all pointer-events-none whitespace-nowrap ${
                        hasIncident
                          ? 'bg-blue-600 text-white border-blue-700 -translate-y-8 z-20'
                          : isSelected
                          ? 'bg-slate-900 text-white border-slate-900 -translate-y-7 z-20'
                          : 'bg-white text-slate-800 border-slate-300 -translate-y-6 group-hover:-translate-y-7'
                      }`}
                      style={{ bottom: `${heightPct}%` }}
                    >
                      {dayData.waitDuration}
                    </div>

                    {/* Point Marker */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-transform ${
                        hasIncident
                          ? 'bg-blue-600 border-white ring-2 ring-blue-500 scale-125'
                          : isSelected
                          ? 'bg-red-600 border-white ring-2 ring-red-400 scale-125'
                          : 'bg-white border-blue-600 group-hover:scale-125'
                      }`}
                      style={{
                        position: 'absolute',
                        bottom: `calc(${heightPct}% - 7px)`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* X Axis Labels */}
          <div className="pl-8 flex justify-between text-3xs sm:text-2xs text-slate-500 pt-3">
            {DAILY_QUEUE_WAITS.map((dayData) => (
              <div
                key={dayData.day}
                onClick={() => setSelectedDay(dayData.day)}
                className={`text-center cursor-pointer transition-colors ${
                  selectedDay === dayData.day ? 'font-bold text-red-600' : 'hover:text-slate-900'
                }`}
                style={{ width: `${100 / DAILY_QUEUE_WAITS.length}%` }}
              >
                <div className="capitalize truncate">{dayData.dayName.split(' ')[0].slice(0, 3)}</div>
                <div className="font-bold">{dayData.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Day Info & Official Observation */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 mb-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Observación Oficial del Reporte</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {EXECUTIVE_OBSERVATIONS.queue}
            </p>
            <div className="mt-2 text-xs text-blue-800 bg-blue-50 border border-blue-200 rounded-md p-2 font-medium">
              <strong>Miércoles 9:</strong> FALLA RECONOSER BIOMETRIA (INC22891719) — clasificado como evento masivo con impacto bajo. No presentó afectaciones en los indicadores de servicio.
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Detalle del Día Seleccionado
              </span>
              <div className="text-sm font-bold text-slate-900 capitalize">
                {activeDayData?.dayName} (Septiembre {activeDayData?.day})
              </div>
              <div className="text-2xl font-black text-blue-600 mt-2">
                {activeDayData?.waitDuration}{' '}
                <span className="text-xs font-semibold text-slate-500">min/seg de espera</span>
              </div>
            </div>

            {activeDayData?.incidentTag ? (
              <div className="mt-3 text-2xs p-2 bg-blue-50 text-blue-900 rounded-md border border-blue-200">
                <span className="font-bold block">{activeDayData.incidentTag.code}</span>
                <span>{activeDayData.incidentTag.title}</span>
              </div>
            ) : (
              <div className="mt-3 text-2xs text-emerald-700 bg-emerald-50 rounded-md p-2 border border-emerald-200">
                Operación en parámetros normales y estables.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
