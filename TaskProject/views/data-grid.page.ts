import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="grid-container">
      <header class="grid-header">
        <h1>User Management</h1>
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search by name or email..." 
          />
        </div>
      </header>

      <div class="table-wrapper">
        <table class="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of filteredUsers(); track user.id) {
              <tr>
                <td class="font-bold">{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <span class="status-badge" [class]="user.status.toLowerCase()">
                    {{ user.status }}
                  </span>
                </td>
                <td class="text-right">
                  <button class="btn-icon">Edit</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="empty-state">No users found matching your search.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .grid-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .grid-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    
    .search-box input {
      padding: 10px 16px; border: 1px solid #e2e8f0; border-radius: 8px;
      width: 300px; outline: none; transition: border 0.2s;
    }
    .search-box input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

    .table-wrapper { 
      background: white; border-radius: 12px; border: 1px solid #e2e8f0; 
      overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
    }

    .modern-table { width: 100%; border-collapse: collapse; text-align: left; }
    .modern-table th { background: #f8fafc; padding: 16px; font-size: 0.85rem; color: #64748b; text-transform: uppercase; }
    .modern-table td { padding: 16px; border-top: 1px solid #f1f5f9; color: #1e293b; font-size: 0.95rem; }
    
    .font-bold { font-weight: 600; }
    .text-right { text-align: right; }

    /* Status Badges */
    .status-badge { padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .active { background: #dcfce7; color: #166534; }
    .inactive { background: #fee2e2; color: #991b1b; }

    .btn-icon { background: none; border: none; color: #2563eb; cursor: pointer; font-weight: 500; }
    .empty-state { text-align: center; padding: 40px; color: #94a3b8; }
  `
})
export class DataGridPage {
  // 1. Data Source Signal
  users = signal<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@tech.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@web.com', role: 'Viewer', status: 'Active' },
    { id: 4, name: 'Dana White', email: 'dana@corp.com', role: 'Editor', status: 'Active' },
  ]);
  
  // 2. Search Query Signal
  searchQuery = signal('');

  // 3. Computed Signal for Filtering (Pro v20 Technique)
  filteredUsers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.users().filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    );
  });
}