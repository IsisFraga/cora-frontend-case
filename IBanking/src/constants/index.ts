export const FILTER_TYPES = {
  ALL: 'ALL',
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT'
} as const;

export type FilterType = keyof typeof FILTER_TYPES;

export const TRANSACTION_TYPES = {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT',
  REFUND: 'REFUND'
} as const;

export type TransactionType = keyof typeof TRANSACTION_TYPES;