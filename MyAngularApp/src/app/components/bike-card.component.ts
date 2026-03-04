import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Bike } from '../../services/bike.service';

@Component({
  selector: 'app-bike-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="card-container">
      <div class="gloss-shimmer"></div>
      
      <div class="content-layer">
        <div class="header-unit">
          <div class="brand-strip">
            <span class="brand-text">{{ bike.brand }}</span>
            <span class="serial-no">#00{{ bike.id }}</span>
          </div>
          <h3 class="model-title">{{ bike.model }}</h3>
        </div>

        <div class="visual-engine">
          <img [src]="bike.image" [alt]="bike.model" class="main-visual" />
          
          <div class="data-glass">
            <div class="data-point">
              <label>EMI FROM</label>
              <strong>₹4,200/mo*</strong>
            </div>
            <div class="data-divider"></div>
            <div class="data-point">
              <label>AVAILABILITY</label>
              <strong class="status">READY</strong>
            </div>
          </div>
        </div>

        <div class="footer-unit">
          <div class="price-block">
            <span class="caption">Ex-Showroom Price</span>
            <div class="amount">{{ bike.price | currency:'INR':'symbol':'1.0-0' }}</div>
          </div>
          
          <button class="action-trigger">
            <span class="btn-text">EXPLORE</span>
            <div class="btn-icon">→</div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --primary: #e63946; --deep: #121212; display: block; }

    .card-container {
      position: relative; background: #ffffff; border-radius: 24px;
      padding: 32px; overflow: hidden; border: 1px solid #eaeaea;
      transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d; height: 520px;
    }

    /* Enterprise Motion: The Shimmer Follow */
    .gloss-shimmer {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
      transform: translateX(-100%) skewX(-15deg); transition: 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .card-container:hover {
      transform: translateY(-12px) scale(1.01);
      box-shadow: 0 40px 80px rgba(0,0,0,0.08);
      border-color: var(--primary);
    }

    .card-container:hover .gloss-shimmer { transform: translateX(100%) skewX(-15deg); }

    /* Parallax Image Effect */
    .visual-engine {
      position: relative; height: 240px; display: flex; align-items: center; justify-content: center;
    }
    .main-visual {
      width: 120%; position: relative; z-index: 2;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
    }
    .card-container:hover .main-visual { transform: scale(1.1) translateX(10px) rotate(-2deg); }

    /* Data Glass (Overlay) */
    .data-glass {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);
      border-radius: 16px; padding: 16px; display: flex;
      transform: translateY(20px); opacity: 0; transition: 0.5s ease;
      border: 1px solid rgba(255,255,255,0.5); z-index: 3;
    }
    .card-container:hover .data-glass { transform: translateY(-10px); opacity: 1; }

    /* Typography & Buttons */
    .brand-text { font-size: 0.7rem; letter-spacing: 4px; font-weight: 800; color: #aaa; }
    .model-title { font-size: 2rem; font-weight: 900; margin-top: 5px; letter-spacing: -1px; }

    .action-trigger {
      display: flex; align-items: center; gap: 12px;
      background: var(--deep); color: white; border: none;
      padding: 12px 24px; border-radius: 100px; cursor: pointer;
      transition: 0.3s;
    }
    .action-trigger:hover { background: var(--primary); transform: translateX(5px); }
  `]
})
export class BikeCardComponent { @Input({ required: true }) bike!: any; }