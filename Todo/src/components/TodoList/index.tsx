import React from 'react';
import { TodoListItem } from '../TodoListItem';
import { TodoItem } from '../../types';

interface TodoListProps {
  filteredTodos: TodoItem[];
  onDeleteTask: (id: string) => void;
  onChangeTaskStatus: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ filteredTodos, onDeleteTask, onChangeTaskStatus }) => (
  <ul className="todo__list">
    {filteredTodos.length === 0 ? (
      <li className="todo__item">
        <strong>Ops!!!</strong>Nenhum resultado foi encontrado
        &#128533;
      </li>
    ) : (
      filteredTodos.map((item, index) => (
        <TodoListItem
          key={item.id}
          item={item}
          index={index}
          onDeleteTask={onDeleteTask}
          onChangeTaskStatus={onChangeTaskStatus}
        />
      ))
    )}
  </ul>
);