export interface User {
  id: string;
  email: string;
  password: string;
  nombre: string;
  cargo: string;
  celular: string;
  avatar: string | null;
  mercadoId: string;
  rol: 'cobrador' | 'admin' | 'supervisor';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}