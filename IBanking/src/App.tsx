import React, { useEffect } from 'react';
import { useIBankingStore } from './store';
import TransactionList from './components/TransactionList';
import FilterButtons from './components/FilterButtons';
import { useLoginStore } from '../../Login/src/store/useLoginStore';
import './styles.css';

const IBankingApp: React.FC = () => {
  const token = useLoginStore((state) => state.token);
  const { fetchTransactions, isLoading, error } = useIBankingStore();

  useEffect(() => {
    if (token) {
      fetchTransactions(token);
    }
  }, [fetchTransactions, token]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="ibanking-container">
      <FilterButtons />
      <TransactionList />
    </div>
  );
};

export default IBankingApp;