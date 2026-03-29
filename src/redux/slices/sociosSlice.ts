import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Socio, SocioCreate, SocioUpdate } from '@/interfaces/socio.interface';
import { getFromStorage, saveToStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';

// ── Thunks ────────────────────────────────────────────────────────────────────
export const loadSocios = createAsyncThunk('socios/load', async () => {
  const data = getFromStorage<Socio[]>(LS_KEYS.SOCIOS) ?? [];
  return data;
});

// ── Estado ────────────────────────────────────────────────────────────────────
interface SociosState {
  items:   Socio[];
  loading: boolean;
  error:   string | null;
}

const initialState: SociosState = {
  items:   [],
  loading: false,
  error:   null,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function persist(socios: Socio[]) {
  saveToStorage(LS_KEYS.SOCIOS, socios);
}

function generateId(): string {
  return `soc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Slice ─────────────────────────────────────────────────────────────────────
const sociosSlice = createSlice({
  name: 'socios',
  initialState,
  reducers: {
    addSocio(state, action: PayloadAction<SocioCreate>) {
      const nuevo: Socio = {
        ...action.payload,
        id:           generateId(),
        deudaTotal:   0,
        diasDeuda:    0,
        estado:       'libre',
        fechaIngreso: new Date().toISOString().split('T')[0],
        activo:       true,
      };
      state.items.push(nuevo);
      persist(state.items);
    },

    updateSocio(state, action: PayloadAction<SocioUpdate>) {
      const idx = state.items.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload };
        persist(state.items);
      }
    },

    deleteSocio(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex((s) => s.id === action.payload);
      if (idx !== -1) {
        state.items[idx].activo = false;
        persist(state.items);
      }
    },

    /** Actualiza deuda y estado tras un cobro */
    actualizarDeudaSocio(
      state,
      action: PayloadAction<{ socioId: string; deudaTotal: number; diasDeuda: number }>,
    ) {
      const { socioId, deudaTotal, diasDeuda } = action.payload;
      const socio = state.items.find((s) => s.id === socioId);
      if (socio) {
        socio.deudaTotal = deudaTotal;
        socio.diasDeuda  = diasDeuda;
        socio.estado     = deudaTotal > 0 ? 'deuda' : 'pagado';
        persist(state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSocios.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loadSocios.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(loadSocios.rejected,  (state) => { state.loading = false; state.error = 'Error cargando socios'; });
  },
});

export const { addSocio, updateSocio, deleteSocio, actualizarDeudaSocio } = sociosSlice.actions;
export default sociosSlice.reducer;