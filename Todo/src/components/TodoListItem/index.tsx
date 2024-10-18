import React from 'react';
import { TodoItem } from '../../types';

interface TodoListItemProps {
  item: TodoItem;
  index: number;
  onDeleteTask: (id: string) => void;
  onChangeTaskStatus: (id: string) => void;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ item, index, onDeleteTask, onChangeTaskStatus }) => {
  const returnItemStatus = item.status === 'done' ? 'pending' : 'done'
  
  return (
  <li>
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
        <button onClick={() => onDeleteTask(item.id)}>
          Delete
        </button>
        <button onClick={() => onChangeTaskStatus(item.id)}>
          Change to {returnItemStatus}
        </button>
      </div>
    </div>
  </li>
)};