import { Component, input } from '@angular/core';
import { ProjectCard } from '../models/dynamic-card.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <div class="card" [class]="data().status">
      <div class="card-header">
        <h3>{{ data().title }}</h3>
        <span class="status-dot"></span>
      </div>
      <p class="desc">{{ data().description }}</p>
      
      <div class="progress-container">
        <div class="progress-bar" [style.width.%]="data().progress"></div>
      </div>
      
      <div class="card-footer">
        <span class="percentage">{{ data().progress }}% Complete</span>
        <button class="btn-detail">Manage</button>
      </div>
    </div>
  `,
  styles: `
    .card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #eef2f6; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }
    .desc { color: #64748b; font-size: 0.9rem; line-height: 1.5; height: 40px; }
    
    .progress-container { background: #f1f5f9; height: 6px; border-radius: 3px; margin: 15px 0; overflow: hidden; }
    .progress-bar { background: var(--primary, #2563eb); height: 100%; transition: width 0.5s ease; }
    
    /* Status specific colors */
    .planning .progress-bar { background: #94a3b8; }
    .active .progress-bar { background: #2563eb; }
    .completed .progress-bar { background: #10b981; }

    .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; }
    .percentage { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .btn-detail { padding: 6px 12px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; cursor: pointer; font-size: 0.8rem; transition: all 0.2s; }
    .btn-detail:hover { background: #f8fafc; border-color: #cbd5e1; }
  `
})
export class ProjectCardComponent {
  // v20 Signal Input
  data = input.required<ProjectCard>();
}