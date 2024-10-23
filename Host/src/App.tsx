import React, { lazy, Suspense, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { useLoginStore } from '../../Login/src/store/useLoginStore';

const Todo = lazy(() => import('todoApp/App'));
const IBanking = lazy(() => 
  import('ibankingApp/App')
    .then(module => ({ default: module.default || module }))
    .catch(error => {
      console.error('Error loading IBanking module:', error);
      return { default: () => <div>Erro para carregar o IBanking</div> };
    })
);
const Login = lazy(() => import('loginApp/App')) as React.ComponentType<{ onLoginSuccess: () => void }>;

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { checkAuthStatus, getIsAuthenticated } = useLoginStore();

  useEffect(() => {
    const init = async () => {
      try {
        await checkAuthStatus();
        setIsAuthenticated(getIsAuthenticated());
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [checkAuthStatus, getIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

const LoginWrapper: React.FC = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate('/ibanking');
  };
  return <Login onLoginSuccess={handleLoginSuccess} />;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/ibanking" element={<ProtectedRoute element={<IBanking />} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;