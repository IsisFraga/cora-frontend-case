import { create } from 'zustand';
import axios from 'axios';
import { IBankingState } from '../types';

export const useIBankingStore = create<IBankingState>((set) => ({
  transactions: [],
  filter: 'ALL',
  isLoading: false,
  error: null,
  setFilter: (filter: 'DEBIT' | 'CREDIT' | 'ALL') => set({ filter }),
  fetchTransactions: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('http://localhost:3000/list', {
        headers: { token },
      });
      set({ transactions: response.data.results, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch transactions', isLoading: false });
      console.error('Error fetching transactions:', error);
    }
  },
}));