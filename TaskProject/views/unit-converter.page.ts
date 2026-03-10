import { Component } from '@angular/core';
import { UnitWidgetComponent } from '../components/unit-widget.component';

@Component({
  standalone: true,
  imports: [UnitWidgetComponent],
  template: `
    <main class="container">
      <div class="header">
        <h1>Precision Converter</h1>
        <p>Enterprise unit transformation engine</p>
      </div>
      
      <app-unit-widget />
      
      <div class="info-footer">
        * Standard conversion factors applied based on SI units.
      </div>
    </main>
  `,
  styles: `
    .container { max-width: 500px; margin: 60px auto; padding: 0 20px; }
    .header { margin-bottom: 32px; text-align: center; }
    h1 { color: #0f172a; font-size: 1.8rem; margin: 0; }
    p { color: #64748b; margin-top: 8px; }
    .info-footer { margin-top: 24px; font-size: 0.75rem; color: #94a3b8; text-align: center; }
  `
})
export class UnitConverterPage {}