import { Component, inject } from '@angular/core';
import { TodoWidgetComponent } from '../components/todo-widget.component';
import { TodoService } from '../services/todo.service';

@Component({
  standalone: true,
  imports: [TodoWidgetComponent],
  template: `
    <main class="page-container">
      <div class="dashboard-header">
        <h1>Task Dashboard</h1>
        <div class="pill-container">
          <span class="pill">Active: {{ service.stats().active }}</span>
          <span class="pill success">Done: {{ service.stats().done }}</span>
        </div>
      </div>
      
      <app-todo-widget />
    </main>
  `,
  styles: `
    .page-container { max-width: 600px; margin: 3rem auto; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .pill-container { display: flex; gap: 0.5rem; }
    .pill { background: #e2e8f0; padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.85rem; font-weight: 600; }
    .success { background: #dcfce7; color: #166534; }
  `
})
export class TodoPage 
{
  protected service = inject(TodoService);
}