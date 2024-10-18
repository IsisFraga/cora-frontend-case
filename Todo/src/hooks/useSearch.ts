import { useState, useMemo } from 'react';
import { TodoItem } from '../types';

export const useSearch = (todos: TodoItem[]) => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const filteredTodos = useMemo(() => 
    todos.filter((item) =>
      item.title.toLowerCase().includes(searchInputValue.toLowerCase())
    ),
    [todos, searchInputValue]
  );

  return { searchInputValue, setSearchInputValue, filteredTodos };
};