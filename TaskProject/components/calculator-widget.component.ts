import { Component, inject, HostListener } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';
import { CalcOperator } from '../models/calculator.model';

@Component({
  selector: 'app-calculator-widget',
  standalone: true,
  template: `
    <div class="glass-calculator">
      <div class="screen-container">
        <div class="history-view">{{ service.currentHistory() }}</div>
        <div class="main-display">{{ service.currentDisplay() }}</div>
      </div>
      
      <div class="button-grid">
        @for (btn of buttons; track btn) {
          <button 
            [class]="getBtnClass(btn)"
            (click)="service.handleInput(btn)">
            {{ btn === '*' ? '×' : btn === '/' ? '÷' : btn }}
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    .glass-calculator {
      background: #000; padding: 30px; border-radius: 2.5rem;
      width: 340px; box-shadow: 0 50px 100px rgba(0,0,0,0.5);
    }
    .screen-container {
      text-align: right; padding: 20px; min-height: 120px;
      display: flex; flex-direction: column; justify-content: flex-end;
    }
    .history-view { color: #888; font-size: 1.1rem; min-height: 1.5rem; margin-bottom: 5px; }
    .main-display { color: #fff; font-size: 4rem; font-weight: 200; overflow: hidden; }

    .button-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    
    button {
      height: 65px; border-radius: 50%; border: none; font-size: 1.6rem;
      cursor: pointer; transition: all 0.15s ease;
    }
    button:active { transform: scale(0.92); }

    .btn-num { background: #333; color: white; }
    .btn-op { background: #ff9f0a; color: white; }
    .btn-fn { background: #a5a5a5; color: black; }
    .btn-zero { grid-column: span 2; border-radius: 40px; text-align: left; padding-left: 28px; }
  `
})
export class CalculatorWidgetComponent {
  protected service = inject(CalculatorService);

  readonly buttons: (string | CalcOperator)[] = [
    'AC', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const key = event.key;
    if (/[0-9.]/.test(key)) this.service.handleInput(key);
    if (['+', '-', '*', '/'].includes(key)) this.service.handleInput(key as CalcOperator);
    if (key === 'Enter') this.service.handleInput('=');
    if (key === 'Escape') this.service.handleInput('AC');
  }

  getBtnClass(btn: string | CalcOperator): string {
    if (btn === '0') return 'btn-num btn-zero';
    if (['/', '*', '-', '+', '='].includes(btn as string)) return 'btn-op';
    if (['AC', '+/-', '%'].includes(btn as string)) return 'btn-fn';
    return 'btn-num';
  }
}