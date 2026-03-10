import { Component, inject } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectCardComponent } from '../components/project-card.component';

@Component({
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <div class="page-layout">
      <header class="page-header">
        <div>
          <h1>Project Dashboard</h1>
          <p>You have {{ projectService.projects().length }} active projects</p>
        </div>
        <button class="btn-primary">New Project</button>
      </header>

      <div class="card-grid">
        @for (item of projectService.projects(); track item.id) {
          <app-project-card [data]="item" />
        } @empty {
          <div class="empty-state">No projects found.</div>
        }
      </div>
    </div>
  `,
  styles: `
    .page-layout { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    h1 { margin: 0; color: #0f172a; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
    .btn-primary { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
  `
})
export class ProjectListPage {
  // Inject the service to get the data
  protected projectService = inject(ProjectService);
}