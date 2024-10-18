import React from 'react';

import { TodoHeader } from './components/TodoHeader';
import { TodoSearch } from './components/TodoSearch';
import { TodoList } from './components/TodoList';
import "./index.css";

const TodoApp: React.FC = () => {
  return (
    <main id="page">
      <div>
        <TodoHeader />
        <div className="todo__wrapper">
          <TodoSearch />
          <TodoList />
        </div>
      </div>
    </main>
  );
};

export default TodoApp;