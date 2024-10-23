import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLoginStore } from './store/useLoginStore';
import LoginApp from './App';

jest.mock('./store/useLoginStore', () => ({
  useLoginStore: jest.fn()
}));

jest.mock('./assets/img/logo-full.svg', () => 'logo-mock');
jest.mock('./assets/img/arrow-right.svg', () => 'arrow-mock');

describe('LoginApp', () => {
  const mockOnLoginSuccess = jest.fn();

  let mockLoginStore: any;
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockLoginStore = {
      cpf: '',
      password: '',
      isLoading: false,
      error: null,
      setCpf: jest.fn(),
      setPassword: jest.fn(),
      handleAuth: jest.fn()
    };

    (useLoginStore as unknown as jest.Mock).mockReturnValue(mockLoginStore);
  });

  it('renders login form correctly', () => {
    render(<LoginApp onLoginSuccess={mockOnLoginSuccess} />);
    
    expect(screen.getByPlaceholderText('Insira seu CPF ou e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });

  it('validates CPF format correctly', async () => {
    render(<LoginApp onLoginSuccess={mockOnLoginSuccess} />);
    
    const input = screen.getByPlaceholderText('Insira seu CPF ou e-mail');
    await userEvent.type(input, '35819357833');
    
    expect(input).toHaveValue('358.193.578-33');
    expect(mockLoginStore.setCpf).toHaveBeenCalledWith('35819357833');
  });

  it('validates email format correctly', async () => {
    render(<LoginApp onLoginSuccess={mockOnLoginSuccess} />);
    
    const input = screen.getByPlaceholderText('Insira seu CPF ou e-mail');
    await userEvent.type(input, 'test@example.com');
    
    expect(input).toHaveValue('test@example.com');
    expect(mockLoginStore.setCpf).toHaveBeenCalledWith('test@example.com');
  });

  it('shows error for invalid CPF', async () => {
    render(<LoginApp onLoginSuccess={mockOnLoginSuccess} />);
    
    const input = screen.getByPlaceholderText('Insira seu CPF ou e-mail');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha');
    const submitButton = screen.getByRole('button', { name: /continuar/i });

    await userEvent.type(input, '11111111111');
    await userEvent.type(passwordInput, '123456'),
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('CPF inválido. Por favor, verifique os números.')).toBeInTheDocument();
    });
  });
  

  it('shows error for invalid email', async () => {
    render(<LoginApp onLoginSuccess={mockOnLoginSuccess} />);
    
    const input = screen.getByPlaceholderText('Insira seu CPF ou e-mail');
    const submitButton = screen.getByRole('button', { name: /continuar/i });
    
    await userEvent.type(input, 'invalid-email');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('E-mail inválido. Por favor, verifique o formato.')).toBeInTheDocument();
    });
  });
});
