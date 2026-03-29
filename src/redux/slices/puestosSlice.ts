import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Puesto, PuestoCreate, PuestoUpdate, PuestoEstado } from '@/interfaces/puesto.interface';
import { getFromStorage, saveToStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';

// ── Thunks ────────────────────────────────────────────────────────────────────
export const loadPuestos = createAsyncThunk('puestos/load', async () => {
  return getFromStorage<Puesto[]>(LS_KEYS.PUESTOS) ?? [];
});

// ── Estado ────────────────────────────────────────────────────────────────────
interface PuestosState {
  items:            Puesto[];
  selectedPuestoId: string | null;
  filterSector:     string;        // 'todos' | sectorId
  loading:          boolean;
  error:            string | null;
}

const initialState: PuestosState = {
  items:            [],
  selectedPuestoId: null,
  filterSector:     'todos',
  loading:          false,
  error:            null,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function persist(puestos: Puesto[]) {
  saveToStorage(LS_KEYS.PUESTOS, puestos);
}

function generateId(): string {
  return `pst_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Slice ─────────────────────────────────────────────────────────────────────
const puestosSlice = createSlice({
  name: 'puestos',
  initialState,
  reducers: {
    selectPuesto(state, action: PayloadAction<string | null>) {
      state.selectedPuestoId = action.payload;
    },

    setSectorFilter(state, action: PayloadAction<string>) {
      state.filterSector = action.payload;
    },

    addPuesto(state, action: PayloadAction<PuestoCreate>) {
      const nuevo: Puesto = {
        ...action.payload,
        id:          generateId(),
        estado:      'libre',
        inquilinoId: null,
        orden:       state.items.filter((p) => p.sectorId === action.payload.sectorId).length + 1,
      };
      state.items.push(nuevo);
      persist(state.items);
    },

    updatePuesto(state, action: PayloadAction<PuestoUpdate>) {
      const idx = state.items.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...action.payload };
        persist(state.items);
      }
    },

    /** Cambia el estado visual del puesto tras registro de asistencia/cobro */
    cambiarEstadoPuesto(
      state,
      action: PayloadAction<{ puestoId: string; estado: PuestoEstado }>,
    ) {
      const puesto = state.items.find((p) => p.id === action.payload.puestoId);
      if (puesto) {
        puesto.estado = action.payload.estado;
        persist(state.items);
      }
    },

    asignarInquilino(
      state,
      action: PayloadAction<{ puestoId: string; socioId: string }>,
    ) {
      const puesto = state.items.find((p) => p.id === action.payload.puestoId);
      if (puesto) {
        puesto.inquilinoId = action.payload.socioId;
        puesto.estado      = 'libre';
        persist(state.items);
      }
    },

    liberarPuesto(state, action: PayloadAction<string>) {
      const puesto = state.items.find((p) => p.id === action.payload);
      if (puesto) {
        puesto.inquilinoId = null;
        puesto.estado      = 'libre';
        persist(state.items);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPuestos.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loadPuestos.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(loadPuestos.rejected,  (state) => { state.loading = false; state.error = 'Error cargando puestos'; });
  },
});

export const {
  selectPuesto,
  setSectorFilter,
  addPuesto,
  updatePuesto,
  cambiarEstadoPuesto,
  asignarInquilino,
  liberarPuesto,
} = puestosSlice.actions;

export default puestosSlice.reducer;