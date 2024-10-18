import { useState, useCallback } from 'react';
import { TodoItem } from '../types';
import { TODO_LIST } from '../initial-state';

export const useTodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    TODO_LIST.map(item => ({
      ...item,
      status: item.status === 'done' ? 'done' : 'pending',
      links: item.links?.map(link => ({
        ...link,
        url: link.url || link.link
      }))
    }))
  );

  const handleDeleteTask = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleChangeTaskStatus = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'done' ? 'pending' : 'done' }
          : todo
      )
    );
  }, []);

  return { todos, handleDeleteTask, handleChangeTaskStatus };
};