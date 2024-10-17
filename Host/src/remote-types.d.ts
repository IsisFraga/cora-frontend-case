declare module 'todoApp/App' {
  const TodoApp: React.ComponentType;
  export const loader: () => Promise<any>;
  export default TodoApp;
}

declare module 'ibankingApp/App' {
  const IBankingApp: React.ComponentType;
  export const loader: () => Promise<any>;
  export default IBankingApp;
}