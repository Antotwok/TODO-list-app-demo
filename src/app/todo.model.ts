export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export type TodoView = 'list' | 'calendar';
