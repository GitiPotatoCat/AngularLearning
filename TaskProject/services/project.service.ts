import { Injectable, signal } from '@angular/core';
import { ProjectCard } from '../models/dynamic-card.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  // Central state for all projects
  private projectsState = signal<ProjectCard[]>([
    { id: 1, title: 'Cloud Migration', description: 'Moving legacy servers to AWS.', status: 'active', progress: 65 },
    { id: 2, title: 'Mobile App Redesign', description: 'Improving UX for the iOS app.', status: 'planning', progress: 10 },
    { id: 3, title: 'Security Audit', description: 'Annual penetration testing.', status: 'completed', progress: 100 }
  ]);

  // Read-only access to projects
  projects = this.projectsState.asReadonly();

  addProject(project: ProjectCard) {
    this.projectsState.update(current => [...current, project]);
  }
}