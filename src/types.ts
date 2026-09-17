export type IndicatorType = 'SLA' | 'SLO';

export interface MonthlyRecord {
  month: string;
  value: number; // percentage, e.g. 96.41
  display: string; // e.g. "96,41%"
  compliant: boolean;
}

export interface OperationalIndicator {
  id: string;
  process: 'Mesa de ayuda' | 'Soporte en sitio' | 'Calidad';
  name: string;
  goal: string;
  goalOperator: '<=' | '>=' | '=';
  goalValue: number;
  type: IndicatorType;
  // Sin excepciones values
  sinExcepcion: Record<string, { value: number; display: string; compliant: boolean }>;
  // Con excepciones values
  conExcepcion: Record<string, { value: number; display: string; compliant: boolean }>;
}

export interface TelephonyMetrics {
  llamadasOfrecidas: number;
  llamadasAtendidas: number;
  llamadasAtendidasPct: number;
  llamadasAbandonadas: number;
  llamadasAbandonadasPenalizables: number;
  promedioAbandono: number;
  promedioTiempoLlamada: string;
  tiempoEsperaLinea: string;
  promedioNivelServicioASA: number;
  metaAbandono: number;
  metaASA: number;
}

export interface WeeklyComparisonItem {
  name: string;
  meta: string;
  unit: string;
  week1: {
    label: string;
    denominador: number;
    denominadorLabel: string;
    numerador: number;
    numeradorLabel: string;
    indicador: number;
    indicadorDisplay: string;
    compliant: boolean;
  };
  week2: {
    label: string;
    denominador: number;
    denominadorLabel: string;
    numerador: number;
    numeradorLabel: string;
    indicador: number;
    indicadorDisplay: string;
    compliant: boolean;
  };
}

export interface DailyQueueWait {
  day: number;
  dayName: string;
  dateStr: string;
  waitDuration: string; // e.g. "0:09"
  waitDurationSeconds: number; // 9
  incidentTag?: {
    code: string;
    title: string;
    impact: 'alto' | 'bajo';
  };
}

export interface DemandCause {
  rank: number;
  cause: string;
  cases: number;
  percentage: number;
  percentageDisplay: string;
  category: 'Cuentas' | 'Consultas' | 'Herramientas' | 'Soporte';
}

export interface IncidentClassification {
  category: string;
  cases: number;
  percentage: number;
  percentageDisplay: string;
  color: string;
}

export interface RequirementDetail {
  type: string;
  cases: number;
  percentage: number;
  percentageDisplay: string;
}

export interface RequirementStatus {
  noVencidos: number;
  noVencidosPct: number;
  vencidos: number;
  vencidosPct: number;
  total: number;
}
