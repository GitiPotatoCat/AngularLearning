import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { CakeService } from "../../services/cake.service";
import { Observable, catchError, of } from "rxjs";

@Component({
  selector: 'app-cake-list-component',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="bakery-wrapper">
      <div class="glass-card">
        <div class="header">
          <span class="badge">Open Now</span>
          <h2>Midnight Bakery</h2>
          <p>Artisan cakes baked with organic ingredients.</p>
        </div>

        <div class="content-area">
          @if (cakes$ | async; as cakeList) {
            <div class="cake-grid">
              @for (cake of cakeList; track cake; let i = $index) {
                <div class="cake-item" [style.animation-delay]="i * 100 + 'ms'">
                  <div class="img-placeholder">🎂</div>
                  <div class="details">
                    <span class="name">{{ cake }}</span>
                    <span class="tag">{{ i === 0 ? 'Best Seller' : 'Fresh' }}</span>
                  </div>
                  <button class="order-btn">Add</button>
                </div>
              }
            </div>
          } @else if (errorMessage) {
            <div class="error-state">
              <p>⚠️ {{ errorMessage }}</p>
              <button (click)="reload()">Try Again</button>
            </div>
          } @else {
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Preparing the whisk...</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --primary: #ff7eb9; --secondary: #7afcff; font-family: 'Poppins', sans-serif; }

    .bakery-wrapper { 
      min-height: 100vh; 
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      padding: 32px;
      width: 360px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border: 1px solid white;
    }

    .badge {
      background: #e1fef1; color: #10b981; 
      padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 800;
    }

    .header h2 { margin: 12px 0 4px; font-size: 1.6rem; color: #2d3436; }
    .header p { font-size: 0.85rem; color: #636e72; margin-bottom: 24px; }

    .cake-item {
      display: flex; align-items: center;
      padding: 12px; margin-bottom: 12px;
      background: white; border-radius: 16px;
      border: 1px solid #f1f2f6;
      animation: slideUp 0.4s ease forwards; opacity: 0;
    }

    @keyframes slideUp { 
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .img-placeholder { 
      width: 48px; height: 48px; background: #fff5f8;
      display: flex; align-items: center; justify-content: center;
      border-radius: 12px; font-size: 1.2rem;
    }

    .details { flex: 1; margin-left: 16px; display: flex; flex-direction: column; }
    .name { font-weight: 600; color: #2d3436; font-size: 0.95rem; }
    .tag { font-size: 0.65rem; color: var(--primary); font-weight: 700; text-transform: uppercase; }

    .order-btn {
      background: #2d3436; color: white; border: none;
      padding: 6px 12px; border-radius: 8px; font-size: 0.75rem;
      cursor: pointer; transition: 0.2s;
    }
    .order-btn:hover { background: var(--primary); }

    .loading-state { text-align: center; padding: 40px 0; }
    .spinner { 
      width: 30px; height: 30px; border: 3px solid #f3f3f3;
      border-top: 3px solid var(--primary); border-radius: 50%;
      margin: 0 auto 12px; animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `]
})
export class CakeListComponent {
  private cakeService = inject(CakeService);
  errorMessage: string | null = null;
  
  cakes$ = this.cakeService.getCakes().pipe(
    catchError(err => {
      this.errorMessage = err.message;
      return of(null); // Return null so the @else if (errorMessage) triggers
    })
  );

  reload() {
    window.location.reload(); // Simple refresh for this example
  }
}