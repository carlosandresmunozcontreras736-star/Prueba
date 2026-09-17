import React, { useState } from 'react';
import {
  PhoneCall,
  Eye,
  ShoppingCart,
  ShoppingBag,
  Users,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  ShieldAlert,
  FileSpreadsheet,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  TELEPHONY_METRICS,
  OPERATIONAL_INDICATORS,
  MDA_WEEKLY_COMPARISONS,
  TOP_DEMAND_CAUSES,
  INCIDENT_CLASSIFICATIONS,
  REQUIREMENT_STATUS,
  DAILY_QUEUE_WAITS,
} from '../data/reportData';

interface ExecutiveOverviewProps {
  exceptionMode: 'sin' | 'con' | 'comparativa';
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  exceptionMode,
  onNavigateTab,
}) => {
  const [chartPeriod, setChartPeriod] = useState<'dia' | 'semana' | 'quincena'>('dia');
  const [weeklyView, setWeeklyView] = useState<'semana1' | 'semana2'>('semana1');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Exact 15 days telephony data summing to 3387 offered & 3372 attended
  const dailyData = [
    { day: 1, label: '01 Sep', offered: 348, attended: 346, wait: '0:09' },
    { day: 2, label: '02 Sep', offered: 292, attended: 291, wait: '0:01' },
    { day: 3, label: '03 Sep', offered: 312, attended: 311, wait: '0:02' },
    { day: 4, label: '04 Sep', offered: 288, attended: 287, wait: '0:05' },
    { day: 5, label: '05 Sep', offered: 122, attended: 122, wait: '0:01' },
    { day: 6, label: '06 Sep', offered: 96, attended: 96, wait: '0:01' },
    { day: 7, label: '07 Sep', offered: 334, attended: 332, wait: '0:04' },
    { day: 8, label: '08 Sep', offered: 308, attended: 307, wait: '0:01' },
    { day: 9, label: '09 Sep', offered: 352, attended: 349, wait: '0:03' },
    { day: 10, label: '10 Sep', offered: 298, attended: 297, wait: '0:02' },
    { day: 11, label: '11 Sep', offered: 282, attended: 281, wait: '0:01' },
    { day: 12, label: '12 Sep', offered: 114, attended: 114, wait: '0:01' },
    { day: 13, label: '13 Sep', offered: 88, attended: 88, wait: '0:01' },
    { day: 14, label: '14 Sep', offered: 316, attended: 315, wait: '0:01' },
    { day: 15, label: '15 Sep', offered: 237, attended: 236, wait: '0:02' },
  ];

  // Week days for Profit this week bar chart
  const weekDays = [
    { day: 'M', name: 'Lunes', sem1Att: 334, sem1Off: 336, sem2Att: 315, sem2Off: 316 },
    { day: 'T', name: 'Martes', sem1Att: 346, sem1Off: 348, sem2Att: 274, sem2Off: 276 },
    { day: 'W', name: 'Miércoles', sem1Att: 291, sem1Off: 292, sem2Att: 349, sem2Off: 352 },
    { day: 'T', name: 'Jueves', sem1Att: 311, sem1Off: 312, sem2Att: 297, sem2Off: 298 },
    { day: 'F', name: 'Viernes', sem1Att: 287, sem1Off: 288, sem2Att: 281, sem2Off: 282 },
    { day: 'S', name: 'Sábado', sem1Att: 122, sem1Off: 122, sem2Att: 114, sem2Off: 114 },
    { day: 'S', name: 'Domingo', sem1Att: 96, sem1Off: 96, sem2Att: 88, sem2Off: 88 },
  ];

  // SVG Area coordinates
  const svgWidth = 640;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;
  const maxVal = 400;

  const getX = (index: number) => paddingX + (index / (dailyData.length - 1)) * chartW;
  const getY = (val: number) => paddingY + chartH - (val / maxVal) * chartH;

  // Build bezier curves
  const pointsAtt = dailyData.map((d, i) => `${getX(i)},${getY(d.attended)}`);
  const pointsOff = dailyData.map((d, i) => `${getX(i)},${getY(d.offered)}`);

  const pathAreaAtt = `M ${getX(0)},${paddingY + chartH} L ${pointsAtt.join(' L ')} L ${getX(dailyData.length - 1)},${paddingY + chartH} Z`;
  const pathLineAtt = `M ${pointsAtt.join(' L ')}`;
  const pathLineOff = `M ${pointsOff.join(' L ')}`;

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Title Bar matching TailAdmin */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-[#1C2434]">
            Dashboard Ejecutivo
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Comité Oficial de Tecnología & Operaciones &bull; Corte 01 al 15 de Septiembre 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            12/12 SLAs Cumplidos (100%)
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-full shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            01 - 15 Sep
          </span>
        </div>
      </div>

      {/* Row 1: 4 Metric Cards (Matching TailAdmin exactly) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Card 1: Total views -> Efectividad Telefónica */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <PhoneCall className="w-5 h-5" />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                99.56%
              </h4>
              <span className="text-xs font-medium text-[#64748B]">
                Efectividad Telefónica
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-md">
              <span>+0.43%</span>
              <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Total Profit -> Cumplimiento SLA */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                100%
              </h4>
              <span className="text-xs font-medium text-[#64748B]">
                Cumplimiento SLA (12/12)
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-md">
              <span>0 Penaliz.</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Total Product -> Llamadas Atendidas */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#3C50E0]">
            <Users className="w-5 h-5" />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                3.372
              </h4>
              <span className="text-xs font-medium text-[#64748B]">
                Llamadas Atendidas (Sep)
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-[#3C50E0] bg-blue-50 px-2 py-0.5 rounded-md">
              <span>3.387 Ofrec.</span>
            </span>
          </div>
        </div>

        {/* Card 4: Total Users -> Tasa de Abandono */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#EFF2F7] text-[#10B981]">
            <Clock className="w-5 h-5" />
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-2xl font-bold text-[#1C2434]">
                0,18%
              </h4>
              <span className="text-xs font-medium text-[#64748B]">
                Tasa Abandono (Meta &le;4%)
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-md">
              <span>-3.82% bajo meta</span>
              <TrendingDown className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Charts Area (2/3 Main Area Chart + 1/3 Side Bar Chart) matching TailAdmin */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left 2/3: Total Revenue / Total Sales -> Llamadas Atendidas vs Ofrecidas */}
        <div className="col-span-12 xl:col-span-8 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
          {/* Chart Header with Radio Legend and Period Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Radio 1: Atendidas */}
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#3C50E0]">
                  <span className="h-2 w-2 rounded-full bg-[#3C50E0]"></span>
                </span>
                <div>
                  <p className="text-xs font-bold text-[#3C50E0]">
                    Llamadas Atendidas (3.372)
                  </p>
                  <p className="text-[10px] text-[#64748B]">
                    01.09.2026 - 15.09.2026
                  </p>
                </div>
              </div>

              {/* Radio 2: Ofrecidas */}
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#80CAEE]">
                  <span className="h-2 w-2 rounded-full bg-[#80CAEE]"></span>
                </span>
                <div>
                  <p className="text-xs font-bold text-[#80CAEE]">
                    Llamadas Ofrecidas (3.387)
                  </p>
                  <p className="text-[10px] text-[#64748B]">
                    15 Abandonadas (6 Penalizables)
                  </p>
                </div>
              </div>
            </div>

            {/* Filter pills: Day, Week, Month */}
            <div className="flex items-center rounded-md bg-[#EFF2F7] p-1 text-xs font-semibold">
              <button
                onClick={() => setChartPeriod('dia')}
                className={`rounded px-3 py-1 transition-colors cursor-pointer ${
                  chartPeriod === 'dia'
                    ? 'bg-white text-[#1C2434] shadow-xs'
                    : 'text-[#64748B] hover:text-[#1C2434]'
                }`}
              >
                Día
              </button>
              <button
                onClick={() => setChartPeriod('semana')}
                className={`rounded px-3 py-1 transition-colors cursor-pointer ${
                  chartPeriod === 'semana'
                    ? 'bg-white text-[#1C2434] shadow-xs'
                    : 'text-[#64748B] hover:text-[#1C2434]'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setChartPeriod('quincena')}
                className={`rounded px-3 py-1 transition-colors cursor-pointer ${
                  chartPeriod === 'quincena'
                    ? 'bg-white text-[#1C2434] shadow-xs'
                    : 'text-[#64748B] hover:text-[#1C2434]'
                }`}
              >
                Quincena
              </button>
            </div>
          </div>

          {/* Area Chart with SVG Vector rendering matching TailAdmin */}
          <div className="relative pt-4">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-64 overflow-visible select-none"
            >
              <defs>
                {/* Gradient for Atendidas Area */}
                <linearGradient id="tailAdminAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3C50E0" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3C50E0" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[100, 200, 300, 400].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 4}
                      textAnchor="end"
                      fill="#94A3B8"
                      fontSize="10"
                      fontWeight="500"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Gradient filled area */}
              <path d={pathAreaAtt} fill="url(#tailAdminAreaGrad)" />

              {/* Line 2: Ofrecidas (Cyan) */}
              <path
                d={pathLineOff}
                fill="none"
                stroke="#80CAEE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Line 1: Atendidas (Blue #3C50E0) */}
              <path
                d={pathLineAtt}
                fill="none"
                stroke="#3C50E0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Dots & Tooltip trigger points */}
              {dailyData.map((d, i) => {
                const cx = getX(i);
                const cyAtt = getY(d.attended);
                const cyOff = getY(d.offered);
                const isHovered = hoveredDay === d.day;

                return (
                  <g
                    key={d.day}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredDay(d.day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Vertical hover guide line */}
                    {isHovered && (
                      <line
                        x1={cx}
                        y1={paddingY}
                        x2={cx}
                        y2={paddingY + chartH}
                        stroke="#3C50E0"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Cyan dot (Ofrecidas) */}
                    <circle
                      cx={cx}
                      cy={cyOff}
                      r={isHovered ? 5 : 3.5}
                      fill="#FFFFFF"
                      stroke="#80CAEE"
                      strokeWidth="2.5"
                    />

                    {/* Blue dot (Atendidas) */}
                    <circle
                      cx={cx}
                      cy={cyAtt}
                      r={isHovered ? 5.5 : 4}
                      fill="#FFFFFF"
                      stroke="#3C50E0"
                      strokeWidth="3"
                    />

                    {/* X-axis date labels */}
                    {(i % 2 === 0 || i === dailyData.length - 1) && (
                      <text
                        x={cx}
                        y={svgHeight - 6}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {d.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Box */}
            {hoveredDay !== null && (
              <div
                className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1C2434] text-white p-2.5 rounded-lg shadow-xl text-xs z-20 flex items-center gap-3 border border-slate-700"
              >
                <div>
                  <span className="font-bold text-red-400">
                    {dailyData[hoveredDay - 1].label}
                  </span>
                  <div className="text-[11px] text-slate-300">
                    Espera: {dailyData[hoveredDay - 1].wait} seg
                  </div>
                </div>
                <div className="border-l border-slate-700 pl-3">
                  <div className="text-[#80CAEE] font-bold">
                    Ofrecidas: {dailyData[hoveredDay - 1].offered}
                  </div>
                  <div className="text-[#3C50E0] font-bold">
                    Atendidas: {dailyData[hoveredDay - 1].attended}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 1/3: Profit this week -> Desempeño Semanal */}
        <div className="col-span-12 xl:col-span-4 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-base font-bold text-[#1C2434]">
                Desempeño Semanal
              </h3>

              {/* Selector dropdown */}
              <div className="relative">
                <select
                  value={weeklyView}
                  onChange={(e) => setWeeklyView(e.target.value as any)}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] py-1 pl-2.5 pr-7 text-xs font-semibold text-[#1C2434] outline-hidden cursor-pointer appearance-none"
                >
                  <option value="semana1">Semana 1 (1-8 Sep)</option>
                  <option value="semana2">Semana 2 (9-15 Sep)</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 w-3 h-3 text-[#64748B] pointer-events-none" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold mb-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3C50E0]"></span>
                <span className="text-[#64748B]">Atendidas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#80CAEE]"></span>
                <span className="text-[#64748B]">Ofrecidas</span>
              </div>
            </div>

            {/* Grouped Vertical Bar Chart */}
            <div className="flex items-end justify-between h-48 pt-4 px-2">
              {weekDays.map((item, idx) => {
                const attVal = weeklyView === 'semana1' ? item.sem1Att : item.sem2Att;
                const offVal = weeklyView === 'semana1' ? item.sem1Off : item.sem2Off;
                const heightAtt = `${Math.min(100, Math.round((attVal / 370) * 100))}%`;
                const heightOff = `${Math.min(100, Math.round((offVal / 370) * 100))}%`;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C2434] text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                      {item.name}: {attVal} / {offVal}
                    </div>

                    {/* Dual bars */}
                    <div className="flex items-end gap-1 h-36">
                      <div
                        style={{ height: heightAtt }}
                        className="w-2.5 sm:w-3 bg-[#3C50E0] rounded-t-sm transition-all"
                      />
                      <div
                        style={{ height: heightOff }}
                        className="w-2.5 sm:w-3 bg-[#80CAEE] rounded-t-sm transition-all"
                      />
                    </div>

                    <span className="text-xs font-bold text-[#64748B]">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
            <span>Total llamadas período:</span>
            <span className="font-bold text-[#1C2434]">
              {weeklyView === 'semana1' ? '1.808 llamadas' : '1.564 llamadas'}
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Lower Analytics Cards (Matching Visitors Analytics and Region labels from TailAdmin) */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left: Visitors Analytics -> Top 5 Causas de Demanda MDA */}
        <div className="col-span-12 xl:col-span-7 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-[#1C2434]">
                Top 5 Causas de Demanda (MDA)
              </h3>
              <p className="text-xs text-[#64748B]">
                Concentran el 88,7% del volumen total de solicitudes de usuarios
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('casuisticas')}
              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-1"
            >
              <span>Ver Pareto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {TOP_DEMAND_CAUSES.map((cause) => (
              <div key={cause.rank} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                      {cause.rank}
                    </span>
                    {cause.cause}
                  </span>
                  <span className="font-bold text-[#1C2434]">
                    {cause.percentageDisplay}{' '}
                    <span className="text-slate-400 font-normal">
                      ({cause.cases} casos)
                    </span>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-[#EFF2F7] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cause.rank === 1
                        ? 'bg-[#3C50E0]'
                        : cause.rank === 2
                        ? 'bg-[#80CAEE]'
                        : cause.rank === 3
                        ? 'bg-[#10B981]'
                        : cause.rank === 4
                        ? 'bg-amber-500'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${cause.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Region labels -> Distribución de Acuerdos por Canal */}
        <div className="col-span-12 xl:col-span-5 rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#1C2434]">
                  Acuerdos por Canal & Proceso
                </h3>
                <p className="text-xs text-[#64748B]">
                  Desempeño frente a metas contractuales
                </p>
              </div>

              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                100% CONFORME
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1C2434]">Mesa de Ayuda (Telefónica & Web)</div>
                  <div className="text-[11px] text-[#64748B]">ASA 96,41% | Abandono 0,18%</div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1C2434]">Soporte en Sitio (Incidentes & Req)</div>
                  <div className="text-[11px] text-[#64748B]">99,29% Incidentes | 99,25% Peticiones</div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1C2434]">Calidad & Mejora Continua</div>
                  <div className="text-[11px] text-[#64748B]">97,00% Categorización | 100% Comités</div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1C2434]">Satisfacción de Usuarios</div>
                  <div className="text-[11px] text-[#64748B]">96,40% (Meta contractual &ge; 90%)</div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Cumplido
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('indicadores')}
            className="w-full mt-4 py-2.5 text-center text-xs font-bold text-white bg-[#1C2434] hover:bg-[#2E3A4B] rounded-lg transition-colors cursor-pointer"
          >
            Ver Matriz Completa de 12 Indicadores
          </button>
        </div>
      </div>

      {/* Row 4: Executive Decision Callout Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1C2434]">
                Conclusión del Comité sobre Excepciones (Septiembre 1 - 15)
              </h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Durante esta quincena evaluada, <strong>no se requirió aplicar excepciones operativas</strong> para alcanzar el 100% de cumplimiento contractual. Los indicadores brutos y netos son idénticos, reflejando estabilidad en la plataforma de telefonía, alta efectividad de primer nivel (95,78%) y rápida atención en cola (00:03 seg promedio).
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('indicadores')}
            className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <span>Auditar Histórico</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
