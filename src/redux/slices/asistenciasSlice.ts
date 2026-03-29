import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Asistencia, AsistenciaCreate } from '@/interfaces/asistencia.interface';
import { getFromStorage, saveToStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';
import { getTodayISO } from '@/utils/formatDate';
import { getCurrentTime } from '@/utils/formatTime';

// ── Thunks ────────────────────────────────────────────────────────────────────
export const loadAsistencias = createAsyncThunk('asistencias/load', async () => {
  return getFromStorage<Asistencia[]>(LS_KEYS.ASISTENCIAS) ?? [];
});

// ── Estado ────────────────────────────────────────────────────────────────────
interface AsistenciasState {
  items:   Asistencia[];
  loading: boolean;
  error:   string | null;
}

const initialState: AsistenciasState = {
  items:   [],
  loading: false,
  error:   null,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function persist(items: Asistencia[]) {
  saveToStorage(LS_KEYS.ASISTENCIAS, items);
}

function generateId(): string {
  return `asi_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Slice ─────────────────────────────────────────────────────────────────────
const asistenciasSlice = createSlice({
  name: 'asistencias',
  initialState,
  reducers: {
    registrarAsistencia(state, action: PayloadAction<AsistenciaCreate>) {
      // Evitar duplicados: si ya existe asistencia del mismo puesto en la misma fecha, actualizar
      const existIdx = state.items.findIndex(
        (a) => a.puestoId === action.payload.puestoId && a.fecha === action.payload.fecha,
      );

      if (existIdx !== -1) {
        state.items[existIdx] = {
          ...state.items[existIdx],
          abrio:         action.payload.abrio,
          horaRegistro:  action.payload.horaRegistro || getCurrentTime(),
        };
      } else {
        const nueva: Asistencia = {
          ...action.payload,
          id:           generateId(),
          fecha:        action.payload.fecha || getTodayISO(),
          horaRegistro: action.payload.horaRegistro || getCurrentTime(),
        };
        state.items.push(nueva);
      }
      persist(state.items);
    },

    actualizarAsistencia(
      state,
      action: PayloadAction<{ id: string; abrio: boolean }>,
    ) {
      const item = state.items.find((a) => a.id === action.payload.id);
      if (item) {
        item.abrio = action.payload.abrio;
        persist(state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsistencias.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loadAsistencias.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(loadAsistencias.rejected,  (state) => {
        state.loading = false;
        state.error   = 'Error cargando asistencias';
      });
  },
});

export const { registrarAsistencia, actualizarAsistencia } = asistenciasSlice.actions;
export default asistenciasSlice.reducer;