declare module 'todoApp/App' {
  const TodoApp: React.ComponentType<any>;
  export const loader: () => Promise<any>;
  export default TodoApp;
}

declare module 'bankApp/App' {
  const BankApp: React.ComponentType<any>;
  export const loader: () => Promise<any>;
  export default BankApp;
}