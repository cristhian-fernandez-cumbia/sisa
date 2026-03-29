import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Cobro, CobroCreate } from '@/interfaces/cobro.interface';
import { getFromStorage, saveToStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';
import { getTodayISO } from '@/utils/formatDate';
import { getCurrentTime } from '@/utils/formatTime';
import { generateTicketId } from '@/utils/generateTicketId';

// ── Thunks ────────────────────────────────────────────────────────────────────
export const loadCobros = createAsyncThunk('cobros/load', async () => {
  return getFromStorage<Cobro[]>(LS_KEYS.COBROS) ?? [];
});

// ── Estado ────────────────────────────────────────────────────────────────────
interface CobrosState {
  items:   Cobro[];
  loading: boolean;
  error:   string | null;
  /** Último cobro registrado (para mostrar ticket) */
  lastCobro: Cobro | null;
}

const initialState: CobrosState = {
  items:     [],
  loading:   false,
  error:     null,
  lastCobro: null,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function persist(cobros: Cobro[]) {
  saveToStorage(LS_KEYS.COBROS, cobros);
}

function generateId(): string {
  return `cob_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Slice ─────────────────────────────────────────────────────────────────────
const cobrosSlice = createSlice({
  name: 'cobros',
  initialState,
  reducers: {
    registrarCobro(state, action: PayloadAction<CobroCreate>) {
      const ticketId = action.payload.tipo !== 'solo_asistencia'
        ? generateTicketId()
        : null;

      const nuevo: Cobro = {
        ...action.payload,
        id:       generateId(),
        hora:     action.payload.hora || getCurrentTime(),
        fecha:    action.payload.fecha || getTodayISO(),
        turno:    action.payload.turno ?? 'mañana',
        ticketId,
      };

      state.items.push(nuevo);
      state.lastCobro = nuevo;
      persist(state.items);
    },

    clearLastCobro(state) {
      state.lastCobro = null;
    },

    /** Elimina un cobro (solo para correcciones) */
    eliminarCobro(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
      persist(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCobros.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loadCobros.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(loadCobros.rejected,  (state) => { state.loading = false; state.error = 'Error cargando cobros'; });
  },
});

export const { registrarCobro, clearLastCobro, eliminarCobro } = cobrosSlice.actions;
export default cobrosSlice.reducer;