import { Injectable, signal, computed, effect } from '@angular/core';
import { Todo, TodoFilter, Priority } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService 
{
  // Source of Truth
  private todos = signal<Todo[]>(this.load());
  
  // UI State
  filter = signal<TodoFilter>('all');

  // Advanced Computed: Filters AND Sorts by priority (High -> Low)
  filteredTodos = computed(() => {
    const priorityMap: Record<Priority, number> = { high: 3, medium: 2, low: 1 };
    
    let list = this.todos();

    if (this.filter() === 'active') list = list.filter(t => !t.completed);
    if (this.filter() === 'completed') list = list.filter(t => t.completed);

    return list.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
  });

  // Summary stats for the Header
  stats = computed(() => ({
    total: this.todos().length,
    active: this.todos().filter(t => !t.completed).length,
    done: this.todos().filter(t => t.completed).length
  }));

  constructor() {
    // Auto-save whenever the 'todos' signal changes
    effect(() => localStorage.setItem('tasks_v20', JSON.stringify(this.todos())));
  }

  addTodo(task: string, priority: Priority = 'medium') {
    const item: Todo = { id: crypto.randomUUID(), task, priority, completed: false, createdAt: Date.now() };
    this.todos.update(prev => [item, ...prev]);
  }

  toggle(id: string) {
    this.todos.update(list => list.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  delete(id: string) {
    this.todos.update(list => list.filter(t => t.id !== id));
  }

  clearCompleted() {
    this.todos.update(list => list.filter(t => !t.completed));
  }

  private load(): Todo[] {
    const saved = localStorage.getItem('tasks_v20');
    return saved ? JSON.parse(saved) : [];
  }
}