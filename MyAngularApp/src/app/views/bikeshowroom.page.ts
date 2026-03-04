import { Component, inject } from "@angular/core"; 
import { CurrencyPipe } from "@angular/common";
import { BikeService, Bike } from "../../services/bike.service";
import { BikeCardComponent } from "../components/bike-card.component"; 

@Component({
  selector: 'app-bike-showroom-page',
  standalone: true,
  imports: [BikeCardComponent, CurrencyPipe],
  template: `
    <div class="enterprise-viewport">
      <aside class="meta-sidebar">
        <div class="sidebar-top">
          <div class="logo-unit">EM<span>.</span></div>
          <div class="ver-text">2026 FLEET</div>
        </div>
        <div class="sidebar-stats">
          <div class="s-card">
            <small>ASSETS</small>
            <span>{{ bikes.length }} Units</span>
          </div>
          <div class="s-card">
            <small>NET WORTH</small>
            <span>{{ totalValue | currency:'INR':'symbol':'1.0-0' }}</span>
          </div>
        </div>
      </aside>

      <main class="main-deck">
        <header class="deck-header">
          <div class="breadcrumb">Pipes / CurrencyPipe / <strong>Virtual-Showroom</strong></div>
          <div class="title-row">
            <h1>Premium Inventory</h1>
            <div class="control-unit">
              <button class="active">Grid</button>
              <button>List</button>
            </div>
          </div>
        </header>

        <div class="showroom-grid">
          @for (item of bikes; track item.id; let i = $index) {
            <app-bike-card 
              [bike]="item" 
              class="stagger-reveal"
              [style.animation-delay]="i * 100 + 'ms'"
            />
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .enterprise-viewport {
      display: flex; min-height: 100vh; background: #f4f7f6;
      font-family: 'Inter', sans-serif;
    }

    /* Sidebar Design */
    .meta-sidebar {
      width: 100px; background: #121212; color: white;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 40px 0; position: sticky; top: 0; height: 100vh;
    }
    .logo-unit { font-size: 1.5rem; font-weight: 900; text-align: center; color: #ff4d4d; }
    .ver-text { 
      writing-mode: vertical-rl; transform: rotate(180deg); 
      margin: 40px auto; letter-spacing: 10px; opacity: 0.3; font-weight: 800;
    }
    .s-card { padding: 20px 10px; text-align: center; border-top: 1px solid #333; }
    .s-card small { font-size: 0.5rem; display: block; margin-bottom: 5px; color: #777; }
    .s-card span { font-size: 0.8rem; font-weight: 700; }

    /* Main Deck */
    .main-deck { flex: 1; padding: 40px 60px; }
    .deck-header { margin-bottom: 50px; }
    .breadcrumb { font-size: 0.7rem; color: #999; margin-bottom: 10px; text-transform: uppercase; }
    .title-row { display: flex; justify-content: space-between; align-items: center; }
    .title-row h1 { font-size: 3rem; font-weight: 900; letter-spacing: -2px; }

    .showroom-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 40px;
    }

    /* Enterprise Stagger Animation */
    .stagger-reveal {
      opacity: 0; transform: translateY(30px);
      animation: entReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes entReveal {
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class BikeShowroomPage { 
    protected readonly pageTitle = "CurrencyPipe | Deluxe Edition"
    private bikeService = inject(BikeService);
    bikes: Bike[] = this.bikeService.getBikes();

    totalValue = this.bikes.reduce((acc, b) => acc + b.price, 0);
}