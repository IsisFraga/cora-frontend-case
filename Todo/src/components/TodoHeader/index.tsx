import React from 'react';
import logoImage from '../../assets/logo.svg';

export const TodoHeader: React.FC = () => (
  <>
    <img src={logoImage} alt="logo da Cora" />
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