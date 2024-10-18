import React from 'react';
import { TodoListItem } from '../TodoListItem';
import { useTodoStore } from '../../store';

export const TodoList: React.FC = () => {
  const { todos, searchTerm, deleteTodo, toggleTodoStatus } = useTodoStore();

  const filteredTodos = todos.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="todo__list">
      {filteredTodos.length === 0 ? (
        <li className="todo__item">
          <strong>Ops!!!</strong> Nenhum resultado foi encontrado
          &#128533;
        </li>
      ) : (
        filteredTodos.map((item, index) => (
          <TodoListItem
            key={item.id}
            item={item}
            index={index}
            onDeleteTask={deleteTodo}
            onChangeTaskStatus={toggleTodoStatus}
          />
        ))
      )}
    </ul>
  );
};
