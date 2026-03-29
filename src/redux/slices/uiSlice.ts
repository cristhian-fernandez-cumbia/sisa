import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIState, ToastItem, AppTheme } from '@/interfaces/config.interface';
import { saveToStorage, getFromStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';

// ── Estado inicial ────────────────────────────────────────────────────────────
const persistedTheme = typeof window !== 'undefined'
  ? (getFromStorage<AppTheme>(LS_KEYS.THEME) ?? 'light')
  : 'light';

const initialState: UIState = {
  theme:              persistedTheme,
  toasts:             [],
  ticketModalOpen:    false,
  puestoSheetOpen:    false,
  selectedPuestoId:   null,
  sideNavOpen:        false,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateToastId(): string {
  return `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

// ── Slice ─────────────────────────────────────────────────────────────────────
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ── Theme ──
    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme = action.payload;
      saveToStorage(LS_KEYS.THEME, action.payload);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveToStorage(LS_KEYS.THEME, state.theme);
    },

    // ── Toasts ──
    addToast(state, action: PayloadAction<Omit<ToastItem, 'id'>>) {
      state.toasts.push({ ...action.payload, id: generateToastId() });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts(state) {
      state.toasts = [];
    },

    // ── Ticket Modal ──
    openTicketModal(state) {
      state.ticketModalOpen = true;
    },
    closeTicketModal(state) {
      state.ticketModalOpen = false;
    },

    // ── Puesto Bottom Sheet ──
    openPuestoSheet(state, action: PayloadAction<string>) {
      state.puestoSheetOpen  = true;
      state.selectedPuestoId = action.payload;
    },
    closePuestoSheet(state) {
      state.puestoSheetOpen  = false;
      state.selectedPuestoId = null;
    },

    // ── Side Nav (tablet/desktop) ──
    toggleSideNav(state) {
      state.sideNavOpen = !state.sideNavOpen;
    },
    setSideNav(state, action: PayloadAction<boolean>) {
      state.sideNavOpen = action.payload;
    },
  },
});

export const {
  setTheme, toggleTheme,
  addToast, removeToast, clearToasts,
  openTicketModal, closeTicketModal,
  openPuestoSheet, closePuestoSheet,
  toggleSideNav, setSideNav,
} = uiSlice.actions;

export default uiSlice.reducer;