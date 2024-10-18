import React from 'react';

interface TodoHeaderProps {
  logoSrc: string;
  alt: string;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ logoSrc, alt }) => (
  <>
    <img src={logoSrc} alt={alt} />
    <h1>Weekly to-do list &#128467;</h1>
    <h2>
      Bem-vindo ao nosso produto <i>fake</i> de <strong>to-do</strong> list
    </h2>
    <p>
      Marque como{' '}
      <strong>
        <u>done</u>
      </strong>{' '}
      as tasks que você conseguir concluir (elas já precisam renderizar com
      o status <strong>done</strong>)
    </p>
    <p className="disclaimer">
      Items obrigatórios marcados com asterisco (<strong>*</strong>)
    </p>
  </>
);