import React, { useMemo } from 'react';
import { useIBankingStore } from '../../store';
import TransactionItem from '../TransactionItem';
import { formatCurrency } from '../../../../utils';
import { calculateDayBalance } from '../../utils';
import { FormattedDate } from '../FormattedDate';
import './styles.css';

export const TransactionList: React.FC = () => {
  const transactions = useIBankingStore((state) => state.transactions);
  const filter = useIBankingStore((state) => state.filter);

  const filteredTransactions = useMemo(() => 
    transactions
      .map(group => ({
        ...group,
        items: group.items.filter(item => 
          filter === 'ALL' ? true : item.entry === filter
        )
      }))
      .filter(group => group.items.length > 0)
  , [transactions, filter]);

  return (
    <div className="transactions">
      {filteredTransactions.map((group) => (
        <div key={group.date} className="transactions__day">
          <div className="transactions__header">
            <span className="transactions__date">
              <FormattedDate date={group.date} />
            </span>
            <span className="transactions__balance">
              saldo do dia{" "}
              {formatCurrency(calculateDayBalance(group.items))}
            </span>
          </div>
          
          <div className="transactions__divider" />
          
          <div className="transactions__group">
            {group.items.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </div>
          
          <div className="transactions__divider" />
        </div>
      ))}
    </div>
  );
};

export default TransactionList;