import { Component, inject } from '@angular/core';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoFilter, Priority } from '../models/todo.model';

@Component({
  selector: 'app-todo-widget',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
  template: `
    <div class="todo-wrapper">
      <div class="input-area">
        <input #tInput type="text" placeholder="New task..." (keyup.enter)="add(tInput, pSelect.value)" />
        <select #pSelect>
          <option value="low">Low</option>
          <option value="medium" selected>Medium</option>
          <option value="high">High</option>
        </select>
        <button (click)="add(tInput, pSelect.value)">Add</button>
      </div>

      <div class="controls">
        <div class="tabs">
          @for (f of filters; track f) {
            <button [class.active]="service.filter() === f" (click)="service.filter.set(f)">
              {{ f | titlecase }}
            </button>
          }
        </div>
        <button class="clear-btn" (click)="service.clearCompleted()">Clear Done</button>
      </div>

      <ul class="list">
        @for (item of service.filteredTodos(); track item.id) {
          <li [class]="item.priority">
            <input type="checkbox" [checked]="item.completed" (change)="service.toggle(item.id)" />
            <div class="text-group">
              <span [class.strikethrough]="item.completed">{{ item.task }}</span>
              <small>{{ item.createdAt | date:'shortTime' }} • {{ item.priority }}</small>
            </div>
            <button (click)="service.delete(item.id)">Delete</button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    .todo-wrapper { background: white; border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .input-area { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
    input { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem; }
    
    .controls { display: flex; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 1rem; }
    .tabs button { background: none; border: none; padding: 0.5rem 1rem; cursor: pointer; color: #666; }
    .tabs button.active { color: #2563eb; font-weight: bold; border-bottom: 2px solid #2563eb; }
    
    .list { list-style: none; padding: 0; }
    li { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 0.5rem; margin-bottom: 0.5rem; }
    .high { border-left: 5px solid #ef4444; background: #fef2f2; }
    .medium { border-left: 5px solid #f59e0b; background: #fffbeb; }
    .low { border-left: 5px solid #10b981; background: #f0fdf4; }
    
    .text-group { flex: 1; display: flex; flex-direction: column; }
    .strikethrough { text-decoration: line-through; color: #999; }
    .clear-btn { font-size: 0.8rem; color: #ef4444; border: none; background: none; cursor: pointer; }
  `
})
export class TodoWidgetComponent 
{
  protected service = inject(TodoService);
  readonly filters: TodoFilter[] = ['all', 'active', 'completed'];

  add(input: HTMLInputElement, priority: string) {
    if (input.value.trim()) {
      this.service.addTodo(input.value, priority as Priority);
      input.value = '';
    }
  }
}