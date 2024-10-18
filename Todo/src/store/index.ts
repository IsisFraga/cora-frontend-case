import { create } from 'zustand';
import { TodoItem } from '../types';
import { TODO_LIST } from '../initial-state';

interface TodoStore {
  todos: TodoItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (id: string) => void;
  toggleTodoStatus: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: TODO_LIST.map(item => ({
    ...item,
    status: item.status === 'done' ? 'done' : 'pending',
    links: item.links?.map(link => ({
      ...link,
      url: link.url || link.link
    }))
  })),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  toggleTodoStatus: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === 'done' ? 'pending' : 'done' }
        : todo
    )
  })),
}));