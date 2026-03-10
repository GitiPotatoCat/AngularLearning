import { Component, signal, HostListener, ElementRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="nav-container">
      <div class="nav-content">
        <div class="nav-logo" routerLink="/home">
          Angular<span class="logo-accent">App</span>
        </div>

        <div class="nav-links">
          <a routerLink="/home" routerLinkActive="active-link" class="nav-item">Home</a>
          
          <div class="dropdown-wrapper">
            <button class="nav-item dropdown-toggle" (click)="toggleDropdown()">
              Tasks
              <svg class="chevron" [class.rotated]="isDropdownOpen()" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
            </button>

            @if (isDropdownOpen()) {
              <div class="dropdown-panel" 
                   animate.enter="fade-slide-in" 
                   animate.leave="fade-slide-out">

                <div class="dropdown-scroll-area">
                  <span class="dropdown-section">Calculations</span>
                  <a routerLink="/tasks/add-number" (click)="closeDropdown()" class="dropdown-item">Add Numbers</a>
                  <a routerLink="/tasks/calculator" (click)="closeDropdown()" class="dropdown-item">Calculator</a>

                  <span class="dropdown-section">UI Components</span>
                  <a routerLink="/tasks/dynamic-card" (click)="closeDropdown()" class="dropdown-item">Dynamic Card</a>
                  <a routerLink="/tasks/data-grid" (click)="closeDropdown()" class="dropdown-item">Data Grid</a>
                  <a routerLink="/tasks/modal-gallery" (click)="closeDropdown()" class="dropdown-item">Modal Gallery</a>
            
                  <span class="dropdown-section">Utilities</span>
                  <a routerLink="/tasks/todo-page" (click)="closeDropdown()" class="dropdown-item">Todo List</a>
                  <a routerLink="/tasks/unit-converter" (click)="closeDropdown()" class="dropdown-item">Unit Converter</a>
                  <a class="dropdown-item disabled">Weather API</a>
                </div>
              </div>
            }
          </div>

          <a routerLink="/about" routerLinkActive="active-link" class="nav-item">About Us</a>
        </div>
      </div>
    </nav>
  `,
  styles: `
    :host { --primary: #2563eb; --text-main: #1e293b; --text-muted: #64748b; --bg-glass: rgba(255, 255, 255, 0.8); }

    .nav-container {
      position: sticky; top: 0; z-index: 1000;
      background: var(--bg-glass); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05); height: 64px;
      display: flex; align-items: center; justify-content: center;
    }

    .nav-content { width: 100%; max-width: 1200px; padding: 0 24px; display: flex; justify-content: space-between; align-items: center; }

    .nav-logo { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.5px; cursor: pointer; color: var(--text-main); }
    .logo-accent { color: var(--primary); }

    .nav-links { display: flex; gap: 8px; align-items: center; }

    .nav-item {
      padding: 8px 16px; font-size: 0.95rem; font-weight: 500; color: var(--text-muted);
      text-decoration: none; border-radius: 6px; transition: all 0.2s ease;
      background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 4px;
    }

    .nav-item:hover { color: var(--text-main); background: rgba(0, 0, 0, 0.04); }
    .active-link { color: var(--primary) !important; background: rgba(37, 99, 235, 0.08); }

    /* Dropdown Styling */
    .dropdown-wrapper { position: relative; }
    .chevron { width: 20px; height: 20px; fill: currentColor; transition: transform 0.2s; }
    .chevron.rotated { transform: rotate(180deg); }

    .dropdown-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      min-width: 240px; /* Wider for more content */
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      padding: 8px;
      z-index: 1000;
    }   

    /* Scroll area for long lists */
    .dropdown-scroll-area {
      max-height: 350px; /* Limits height so it doesn't go off-screen */
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      padding-right: 4px; /* Space for scrollbar */
    }   

    /* Modern Scrollbar Styling */
    .dropdown-scroll-area::-webkit-scrollbar { width: 5px; }
    .dropdown-scroll-area::-webkit-scrollbar-track { background: transparent; }
    .dropdown-scroll-area::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }    

    /* Section Headers for organization */
    .dropdown-section {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-muted);
      padding: 12px 12px 4px 12px;
      letter-spacing: 0.05em;
    }   

    .dropdown-item {
      padding: 10px 12px;
      font-size: 0.9rem;
      color: var(--text-main);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
    }   

    .dropdown-item:hover {
      background: #f1f5f9;
      color: var(--primary);
      padding-left: 16px; /* Subtle sliding effect on hover */
    }
    .disabled { opacity: 0.4; cursor: not-allowed; }

    /* v20 Native Animations */
    .fade-slide-in { animation: fsi 0.2s cubic-bezier(0, 0, 0.2, 1) forwards; }
    .fade-slide-out { animation: fso 0.15s cubic-bezier(0.4, 0, 1, 1) forwards; }

    @keyframes fsi {
      from { opacity: 0; transform: translateY(-8px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fso {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-8px); }
    }
  `
})
export class NavbarComponent {
  private el = inject(ElementRef);
  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  // Closes the dropdown if user clicks anywhere outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}