import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const isValidCPF = (cpf: string): boolean => {
  const strCPF = cpf.replace(/[^\d]/g, '');
  if (strCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(strCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(strCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(strCPF.substring(10, 11))) return false;

  return true;
};

export const formatCPF = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return cpf;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text: string) => {
  const maxLength = 27;
  return text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount / 100);
};

export const formatDateTime = (dateString: string) => {
  const date = parseISO(dateString);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  return format(localDate, "dd MMM yyyy '-' HH:mm", { locale: ptBR });
};