// import { useLoaderData } from 'react-router-dom';

function TodoApp() {
  // const data = useLoaderData();
  
  return (
    <div>
      <h1>Todo App</h1>
      {/* Use data here */}
    </div>
  );
}

export default TodoApp;

export const loader = async () => {
  // Fetch data or perform any async operations
  return { todos: ['Task 1', 'Task 2', 'Task 3'] };
};