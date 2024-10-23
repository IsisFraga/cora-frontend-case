import { create } from 'zustand'
import axios from 'axios'

interface LoginState {
  cpf: string
  password: string
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  token: string | null
  setCpf: (cpf: string) => void
  setPassword: (password: string) => void
  handleAuth: () => Promise<void>
  logout: () => void
  checkAuthStatus: () => void
  getIsAuthenticated: () => boolean
}

export const useLoginStore = create<LoginState>((set, get) => ({
  cpf: '',
  password: '',
  isLoading: false,
  error: null,
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  setCpf: (cpf) => set({ cpf }),
  setPassword: (password) => set({ password }),
  handleAuth: async () => {
    const { cpf, password } = get()
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3000/auth', { cpf, password })
      const { token } = response.data

      localStorage.setItem('token', token);
      set({ isAuthenticated: true, isLoading: false, token });
    } catch (error) {
      set({ 
        error: 'Falha na autenticação. Por favor, verifique suas credenciais.', 
        isLoading: false, 
        isAuthenticated: false,
        token: null 
      });
      localStorage.removeItem('token');
    }
  },
  logout: () => {
    set({ isAuthenticated: false, cpf: '', password: '', error: null, token: null });
    localStorage.removeItem('token');
  },
  checkAuthStatus: () => {
    const token = localStorage.getItem('token')
    set({ 
      isAuthenticated: !!token,
      token: token
    });
  },
  getIsAuthenticated: () => {
    get().checkAuthStatus()
    return get().isAuthenticated
  }
}));