import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { StatsState, StatsPeriodo } from '@/interfaces/stats.interface';
import type { Cobro } from '@/interfaces/cobro.interface';
import type { Puesto } from '@/interfaces/puesto.interface';
import type { Sector } from '@/interfaces/sector.interface';
import { calcResumen, calcPorDia } from '@/utils/calcStats';
import { getTodayISO, getLastNDays } from '@/utils/formatDate';

// ── Thunk ─────────────────────────────────────────────────────────────────────
export const calcularStats = createAsyncThunk<
  Omit<StatsState, 'loading' | 'error' | 'periodo'>,
  { cobros: Cobro[]; puestos: Puesto[]; sectores: Sector[]; periodo: StatsPeriodo }
>('stats/calcular', async ({ cobros, puestos, periodo }) => {
  let fechas: string[];

  if (periodo === 'hoy') {
    fechas = [getTodayISO()];
  } else if (periodo === 'semana') {
    fechas = getLastNDays(7);
  } else {
    fechas = getLastNDays(30);
  }

  const resumen  = calcResumen(cobros, puestos, fechas);
  const porDia   = calcPorDia(cobros, periodo === 'mes' ? 30 : 7);

  return { resumen, porDia };
});

// ── Estado inicial ────────────────────────────────────────────────────────────
const initialState: StatsState = {
  periodo: 'semana',
  resumen: {
    totalRecaudado:      0,
    totalDeudaAcumulada: 0,
    tasaCobro:           0,
    puestosVisitados:    0,
    puestosTotales:      0,
    puestosPagados:      0,
    puestosDeuda:        0,
    puestosLibres:       0,
    totalTransacciones:  0,
  },
  porDia:  [],
  loading: false,
  error:   null,
};

// ── Slice ─────────────────────────────────────────────────────────────────────
const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setPeriodo(state, action: PayloadAction<StatsPeriodo>) {
      state.periodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calcularStats.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(calcularStats.fulfilled, (state, action) => {
        state.loading = false;
        state.resumen = action.payload.resumen;
        state.porDia  = action.payload.porDia;
      })
      .addCase(calcularStats.rejected,  (state) => {
        state.loading = false;
        state.error   = 'Error calculando estadísticas';
      });
  },
});

export const { setPeriodo } = statsSlice.actions;
export default statsSlice.reducer;