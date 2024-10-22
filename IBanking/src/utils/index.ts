import { Transaction } from "../types";

export const calculateDayBalance = (transactions: Transaction[]): number => {
  return transactions.reduce(
    (sum, t) => sum + (t.entry === "CREDIT" || t.entry === "REFUND" ? t.amount : -t.amount),
    0
  );
};