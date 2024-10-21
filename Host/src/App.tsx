import React, { lazy, Suspense, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { useLoginStore } from '../../Login/src/store';

const Todo = lazy(() => import('todoApp/App'));
const IBanking = lazy(() => import('ibankingApp/App'));
const Login = lazy(() => import('loginApp/App')) as React.ComponentType<{ onLoginSuccess: () => void }>;

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuthStatus, getIsAuthenticated } = useLoginStore();

  useEffect(() => {
    checkAuthStatus();
    setIsAuthenticated(getIsAuthenticated());
    setIsLoading(false);
  }, [checkAuthStatus, getIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
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