import React from 'react';
import { useTodoStore } from '../../store';

export const TodoSearch: React.FC = () => {
  const { searchTerm, setSearchTerm } = useTodoStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="todo__search" onSubmit={handleSearch}>
      <label htmlFor="search" className="sr-only">Buscar tarefa</label>
      <input
        id="search"
        placeholder="busca por texto..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">buscar</button>
    </form>
  );
};
