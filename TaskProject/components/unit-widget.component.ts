import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConverterService } from '../services/converter.service';
import { UnitCategory } from '../models/converter.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-unit-widget',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  template: `
    <div class="converter-card">
      <div class="tabs">
        @for (cat of categories; track cat) {
          <button [class.active]="service.category() === cat" 
                  (click)="service.setCategory(cat)">
            {{ cat }}
          </button>
        }
      </div>

      <div class="converter-body">
        <div class="input-section">
          <input type="number" 
                 [ngModel]="service.inputAmount()" 
                 (ngModelChange)="service.inputAmount.set($event)" />
          
          <select [ngModel]="service.fromUnit()" 
                  (ngModelChange)="service.fromUnit.set($event)">
            @for (unit of service.availableUnits(); track unit.value) {
              <option [value]="unit.value">{{ unit.label }}</option>
            }
          </select>
        </div>

        <div class="divider">
          <span class="equals-sign">=</span>
        </div>

        <div class="result-section">
          <div class="result-display">
            {{ service.convertedValue() | number:'1.2-4' }}
          </div>
          
          <select [ngModel]="service.toUnit()" 
                  (ngModelChange)="service.toUnit.set($event)">
            @for (unit of service.availableUnits(); track unit.value) {
              <option [value]="unit.value">{{ unit.label }}</option>
            }
          </select>
        </div>
      </div>
    </div>
  `,
  styles: `
    .converter-card { background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); padding: 24px; }
    .tabs { display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    .tabs button { 
      padding: 8px 16px; border: none; background: none; cursor: pointer; 
      font-weight: 600; color: #64748b; border-radius: 8px; 
    }
    .tabs button.active { background: #eff6ff; color: #2563eb; }

    .converter-body { display: flex; flex-direction: column; gap: 16px; }
    .input-section, .result-section { display: flex; gap: 12px; }
    
    input, select { 
      padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 1rem; outline: none; 
    }
    input { flex: 2; }
    select { flex: 1; background: #f8fafc; cursor: pointer; }
    
    .result-display { 
      flex: 2; padding: 12px; background: #f1f5f9; border-radius: 10px; 
      font-weight: 700; font-size: 1.2rem; color: #1e293b; 
    }
    .divider { text-align: center; color: #cbd5e1; font-size: 1.5rem; }
  `
})
export class UnitWidgetComponent 
{
  protected service = inject(ConverterService);
  readonly categories: UnitCategory[] = ['Length', 'Mass'];
}