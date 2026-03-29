import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials, User } from '@/interfaces/auth.interface';
import { getAuthUsers } from '@/utils/seedData';
import { saveToStorage, removeFromStorage, getFromStorage } from '@/utils/localStorage';
import { LS_KEYS } from '@/utils/constants';

// ── Thunk: login ──────────────────────────────────────────────────────────────
export const loginThunk = createAsyncThunk<
  Omit<User, 'password'>,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  // Simula latencia de red
  await new Promise((r) => setTimeout(r, 600));

  const users = getAuthUsers();
  const found = users.find(
    (u) =>
      u.email.toLowerCase() === credentials.email.toLowerCase() &&
      u.password === credentials.password,
  );

  if (!found) return rejectWithValue('Credenciales incorrectas. Verifica tu email y contraseña.');

  const { password: _pw, ...safeUser } = found;
  return safeUser;
});

// ── Estado inicial ─────────────────────────────────────────────────────────────
const persistedUser = typeof window !== 'undefined'
  ? getFromStorage<Omit<User, 'password'>>(LS_KEYS.AUTH)
  : null;

const initialState: AuthState = {
  user:            persistedUser,
  isAuthenticated: !!persistedUser,
  loading:         false,
  error:           null,
};

// ── Slice ─────────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user            = null;
      state.isAuthenticated = false;
      state.error           = null;
      removeFromStorage(LS_KEYS.AUTH);
    },
    clearAuthError(state) {
      state.error = null;
    },
    updateUserAvatar(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.avatar = action.payload;
        saveToStorage(LS_KEYS.AUTH, state.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading         = false;
        state.user            = action.payload;
        state.isAuthenticated = true;
        saveToStorage(LS_KEYS.AUTH, action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload ?? 'Error de autenticación';
      });
  },
});

export const { logout, clearAuthError, updateUserAvatar } = authSlice.actions;
export default authSlice.reducer;