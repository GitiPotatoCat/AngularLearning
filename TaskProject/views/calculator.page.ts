import { Component } from '@angular/core';
import { CalculatorWidgetComponent } from '../components/calculator-widget.component';

@Component({
  standalone: true,
  imports: [CalculatorWidgetComponent],
  template: `
    <main class="page-wrapper">
      <section class="header">
        <h1>V20 Calculator</h1>
        <p>A clean, Signal-based implementation</p>
      </section>

      <app-calculator-widget />
    </main>
  `,
  styles: `
    .page-wrapper { 
      display: flex; flex-direction: column; align-items: center; 
      justify-content: center; min-height: 90vh; background: #f4f7f6; 
    }
    .header { text-align: center; margin-bottom: 30px; color: #2c3e50; }
  `
})
export class CalculatorPage {}