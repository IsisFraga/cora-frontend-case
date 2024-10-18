import { lazy, Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home'

const Todo = lazy(() => import('todoApp/App'))
const IBanking = lazy(() => import('ibankingApp/App'));

const router = createHashRouter([
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
  },
  {
    path: "/ibanking",
    element: (
      <Suspense fallback={<div>Carregando IBanking...</div>}>
        <IBanking />
      </Suspense>
    ),
  },
]);

function App() {

  return (

    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;