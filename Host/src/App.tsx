import React, { Suspense, lazy } from "react";
import {
  HashRouter,
  Route,
  Routes,
  Link,
  useLoaderData,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

const Todo = lazy(() => import('todoApp/App'));
const TodoLoader = () => import('todoApp/App').then(module => module.loader);

const Bank = lazy(() => import('bankApp/App'));
const BankLoader = () => import('bankApp/App').then(module => module.loader);

const TodoWrapper = () => {
  const data = useLoaderData();
  return (
    <Suspense fallback={<div>Carregando Todo...</div>}>
      <Todo data={data} />
    </Suspense>
  );
};

const BankWrapper = () => {
  const data = useLoaderData();
  return (
    <Suspense fallback={<div>Carregando IBanking...</div>}>
      <Bank data={data} />
    </Suspense>
  );
};


function App() {
  return (
    <HashRouter>
      <main id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/todo"
            element={
              <Suspense fallback={<div>Carregando Todo...</div>}>
                <TodoWrapper />
              </Suspense>
            }
            loader={TodoLoader}
          />
          <Route
            path="/bank"
            element={
              <Suspense fallback={<div>Carregando IBanking...</div>}>
                <BankWrapper />
              </Suspense>
            }
            loader={BankLoader}
          />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
