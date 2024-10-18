import React from 'react';

interface TodoSearchProps {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({ searchInputValue, setSearchInputValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
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
        value={searchInputValue}
        onChange={handleChange}
      />
      <button type="submit">buscar</button>
    </form>
  );
};