export type TodoFilter = 'all' | 'active' | 'completed';
export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
  priority: Priority;
  createdAt: number; // Using timestamp for easier sorting
}