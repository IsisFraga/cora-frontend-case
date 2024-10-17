import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home'

const Todo = lazy(() => import('todoApp/App'));
const TodoLoader = () => import('todoApp/App').then(module => module.loader);

const IBanking = lazy(() => import('ibankingApp/App'));
const IBankingLoader = () => import('ibankingApp/App').then(module => module.loader);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todo",
    element: (
      <Suspense fallback={<div>Carregando Todo...</div>}>
        <Todo />
      </Suspense>
    ),
    loader: TodoLoader,
  },
  {
    path: "/ibanking",
    element: (
      <Suspense fallback={<div>Carregando IBanking...</div>}>
        <IBanking />
      </Suspense>
    ),
    loader: IBankingLoader,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;