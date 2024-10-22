import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormattedDateProps {
  date: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  const formattedDate = format(parseISO(date), "dd 'de' MMMM", { locale: ptBR });
  const [day, de, month] = formattedDate.split(' ');

  return (
    <span className="transactions__date-formatted">
      {day} {de} <span className="transactions__date-month">{month}</span>
    </span>
  );
};