import React, { ChangeEvent, useState, useCallback } from "react";
import logoImage from './assets/logo.svg';
import { TODO_LIST } from "./initial-state";
import "./index.css";

interface TodoItem {
  id: string;
  ref: string;
  title: string;
  description: React.ReactNode;
  status: 'pending' | 'done';
  required: boolean;
  links?: Array<{ name: string; url?: string; link?: string }>;
}

function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>(() =>
    TODO_LIST.map(item => ({
      ...item,
      status: item.status === 'done' ? 'done' : 'pending',
      links: item.links?.map(link => ({
        ...link,
        url: link.url || link.link
      }))
    } as TodoItem))
  );
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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

  const filteredTodos = todos.filter((item) =>
    item.title.toLowerCase().includes(searchInputValue.toLowerCase())
  );

  return (
    <main id="page">
      <div>
        <img src={logoImage} alt="Cora" />
        <h1>Weekly to-do list &#128467;</h1>
        <h2>
          Bem-vindo ao nosso produto <i>fake</i> de <strong>to-do</strong> list
        </h2>
        <p>
          Marque como{' '}
          <strong>
            <u>done</u>
          </strong>{' '}
          as tasks que você conseguir concluir (elas já precisam renderizar com
          o status <strong>done</strong>)
        </p>
        <p className="disclaimer">
          Items obrigatórios marcados com asterisco (<strong>*</strong>)
        </p>
        <div className="todo__wrapper">
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
          <ul className="todo__list">
            {filteredTodos.length === 0 ? (
              <li className="todo__item">
                <strong>Ops!!!</strong> Nenhum resultado foi encontrado
                &#128533;
              </li>
            ) : (
              filteredTodos.map((item, index) => (
                <li key={item.id}>
                  <span>
                    {index + 1}
                    {item.required && '*'}.
                  </span>
                  <div className="todo__content">
                    <h3>
                      {item.title}
                      <span data-type={item.status}>{item.status}</span>
                    </h3>
                    <div>{item.description}</div>
                    {item.links && item.links.length > 0 && (
                      <div className="todo__links">
                        {item.links.map((link, linkIndex) => (
                          <a key={linkIndex} target="_blank" rel="noopener noreferrer" href={link.url || link.link}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="todo__actions">
                      <button onClick={() => handleDeleteTask(item.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleChangeTaskStatus(item.id)}>
                        Change to {item.status === 'done' ? 'pending' : 'done'}
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default TodoApp;