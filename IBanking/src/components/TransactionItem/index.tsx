import React from 'react';
import { formatCurrency, formatDateTime, truncateText } from '../../../../utils';
import { Transaction } from '../../store';
import TransactionIcon from '../../assets/TransactionIcon';
import './styles.css';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isCredit = transaction.entry === "CREDIT";
  const isRefund = transaction.entry === "REFUND";
  const transactionType = transaction.entry.toLowerCase();

  return (
    <div className="transaction-item">
      <span className={`transaction-item__icon ${transactionType}`}>
        <TransactionIcon 
          transactionEntry={transaction.entry}
          color={isCredit ? 'var(--color-blue)' : 'var(--color-medium-gray)'}
        />
      </span>
      
      <div className={`transaction-item__name ${transactionType}`}>
        {truncateText(transaction.name)}
      </div>
      
      <div className="transaction-item__description">
        {transaction.description}
      </div>
      
      <div className="transaction-item__datetime">
        {formatDateTime(transaction.dateEvent)}
      </div>
      
      <div className={`transaction-item__amount ${transactionType}`}>
        {!isRefund && isCredit && "+"}
        {!isRefund && !isCredit && "-"}{" "}
        {formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;