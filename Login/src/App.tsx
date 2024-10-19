import React, { useState } from 'react';
import { useLoginStore } from './store/index';
import { isValidCPF, formatCPF, isValidEmail } from '../../utils';
import logoFullImage from './assets/img/logo-full.svg';
import arrowRightImage from './assets/img/arrow-right.svg';
import './index.css';

interface LoginAppProps {
  onLoginSuccess?: () => void;
}

const LoginApp: React.FC<LoginAppProps> = ({ onLoginSuccess }) => {
  const { cpf, password, isLoading, error, setCpf, setPassword, handleAuth } = useLoginStore();
  const [localError, setLocalError] = useState<string | null>(null);
  const [formattedCPF, setFormattedCPF] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setIsEmail(false);
      const formatted = formatCPF(value);
      setFormattedCPF(formatted);
      setCpf(value.replace(/\D/g, ''));
    } else {
      setIsEmail(true);
      setCpf(value);
      setFormattedCPF(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (isEmail) {
      if (!isValidEmail(cpf)) {
        setLocalError('E-mail inválido. Por favor, verifique o formato.');
        return;
      }
    } else {
      if (!isValidCPF(cpf)) {
        setLocalError('CPF inválido. Por favor, verifique os números.');
        return;
      }
    }

    if (password.length < 6) {
      setLocalError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await handleAuth();
      onLoginSuccess && onLoginSuccess();
    } catch (error) {
      setLocalError('Falha no login. Por favor tente novamente.');
    }
  };

  return (
    <main className="login">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <form onSubmit={handleSubmit}>
        <h1>Fazer LogIn</h1>
        <div className='container'>
          <input 
            type='text' 
            placeholder="Insira seu CPF ou e-mail" 
            onChange={handleInputChange} 
            value={formattedCPF} 
            maxLength={!isEmail ? 11 : undefined}
            required
          />
          <input
            id="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            minLength={6}
            autoComplete="on"
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Continuar'}
            {!isLoading && <img src={arrowRightImage} alt="Seta para a direita" />}
          </button>
          <div>
            {(localError || error) && <p className="error">{localError || error}</p>}
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoginApp;