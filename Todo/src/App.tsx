import React from 'react';
import logoImage from './assets/logo.svg';

import { useSearch } from './hooks/useSearch';
import { useTodoList } from './hooks/useTodoList';

import { TodoHeader } from './components/TodoHeader';
import { TodoSearch } from './components/TodoSearch';
import { TodoList } from './components/TodoList';

import "./index.css";

const TodoApp: React.FC = () => {
  const { todos, handleDeleteTask, handleChangeTaskStatus } = useTodoList();
  const { searchInputValue, setSearchInputValue, filteredTodos } = useSearch(todos);

  return (
    <main id="page">
      <div>
        <TodoHeader logoSrc={logoImage} alt="Logo da Cora" />
        <div className="todo__wrapper">
          <TodoSearch
            searchInputValue={searchInputValue}
            setSearchInputValue={setSearchInputValue}
          />
          <TodoList
            filteredTodos={filteredTodos}
            onDeleteTask={handleDeleteTask}
            onChangeTaskStatus={handleChangeTaskStatus}
          />
        </div>
      </div>
    </main>
  );
};

export default TodoApp;