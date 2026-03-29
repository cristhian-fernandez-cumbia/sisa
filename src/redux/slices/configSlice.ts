import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AppConfig } from '@/interfaces/config.interface';
import { getFromStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';

// ── Thunk ─────────────────────────────────────────────────────────────────────
export const loadConfig = createAsyncThunk('config/load', async () => {
  return getFromStorage<AppConfig>(LS_KEYS.CONFIG);
});

// ── Estado ────────────────────────────────────────────────────────────────────
interface ConfigState {
  data:    AppConfig | null;
  loading: boolean;
  error:   string | null;
}

const initialState: ConfigState = {
  data:    null,
  loading: false,
  error:   null,
};

// ── Slice ─────────────────────────────────────────────────────────────────────
const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadConfig.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loadConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data    = action.payload;
      })
      .addCase(loadConfig.rejected,  (state) => {
        state.loading = false;
        state.error   = 'Error cargando configuración';
      });
  },
});

export default configSlice.reducer;