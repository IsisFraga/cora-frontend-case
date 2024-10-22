export interface Transaction {
  id: string;
  description: string;
  label: string;
  entry: 'DEBIT' | 'CREDIT' | 'REFUND';
  amount: number;
  name: string;
  dateEvent: string;
  status: string;
}

export interface TransactionGroup {
  date: string;
  items: Transaction[];
}

export interface IBankingState {
  transactions: TransactionGroup[];
  filter: 'DEBIT' | 'CREDIT' | 'ALL';
  isLoading: boolean;
  error: string | null;
  setFilter: (filter: 'DEBIT' | 'CREDIT' | 'ALL') => void;
  fetchTransactions: (token: string) => Promise<void>;
}