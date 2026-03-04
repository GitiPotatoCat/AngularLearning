import { Component, signal, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FruitService } from '../../services/fruit.service';

@Component({
  selector: 'app-fruit-picker-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="fruit-card">
      <header>
        <h3><span class="emoji">🍎</span> Fruit Selection</h3>
        <p class="subtitle">Use arrows ↑↓ to navigate, Enter to select</p>
      </header>

      <div class="autocomplete-container">
        <div class="input-group">
          <input type="text" 
                 [formControl]="fruitControl" 
                 (keydown)="onKeyDown($event)"
                 placeholder="Search fruits..." 
                 autocomplete="off"
                 [class.active]="showSuggestions()" />
          
          @if (fruitControl.value) {
            <button class="clear-btn" (click)="clearInput()">×</button>
          }
        </div>

        @if (showSuggestions()) {
          <ul class="suggestion-list">
            @for (fruit of filteredFruits(); track fruit; let i = $index) {
              <li (click)="selectFruit(fruit)"
                  [class.highlighted]="i === activeIndex()"
                  (mouseenter)="activeIndex.set(i)">
                <span class="fruit-label">{{ fruit }}</span>
                @if (i === activeIndex()) {
                   <span class="action-hint">Enter ↵</span>
                }
              </li>
            }
          </ul>
        }
      </div>

      <div class="selection-footer">
        <span class="label">Status:</span>
        <span class="value" [class.empty]="!fruitControl.value">
          {{ fruitControl.value ? 'Picked ' + fruitControl.value : 'Waiting...' }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    :host { font-family: 'Inter', system-ui, sans-serif; display: block; }

    .fruit-card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      width: 340px;
      padding: 24px;
      margin: 2rem auto;
      border: 1px solid #f0f0f0;
    }

    header h3 { margin: 0; color: #111827; font-size: 1.2rem; }
    .subtitle { margin: 4px 0 20px; color: #6b7280; font-size: 0.8rem; }

    .autocomplete-container { position: relative; }

    input {
      width: 100%;
      padding: 12px 16px;
      font-size: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 10px;
      transition: all 0.2s ease;
      background: #fdfdfd;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    input.active { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }

    .clear-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: #f3f4f6;
      border: none;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      cursor: pointer;
      color: #6b7280;
      line-height: 1;
    }

    .suggestion-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 2px solid #3b82f6;
      border-top: none;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 4px 0;
      margin: 0;
      list-style: none;
      z-index: 100;
      max-height: 240px;
      overflow-y: auto;
    }

    .suggestion-list li {
      padding: 12px 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .suggestion-list li.highlighted {
      background: #eff6ff;
      color: #1d4ed8;
    }

    .fruit-label { font-weight: 500; }
    .action-hint { font-size: 0.65rem; background: #dbeafe; padding: 2px 6px; border-radius: 4px; font-weight: 700; }

    .selection-footer {
      margin-top: 24px;
      padding: 12px 16px;
      background: #f9fafb;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
    }

    .label { color: #6b7280; }
    .value { color: #10b981; font-weight: 700; }
    .value.empty { color: #9ca3af; font-weight: 400; }
  `]
})
export class FruitPicker {
  private fruitService = inject(FruitService);
  
  fruitControl = new FormControl('');
  searchTerm = signal('');
  activeIndex = signal(-1); // Tracks keyboard navigation index

  constructor() {
    // Keep search signal in sync with input
    this.fruitControl.valueChanges.subscribe(val => {
      this.searchTerm.set(val || '');
      this.activeIndex.set(-1); // Reset highlight when typing
    });
  }

  // Reactive logic for filtering
  filteredFruits = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.fruitService.getFruits()
      .filter(f => f.toLowerCase().includes(term));
  });

  // UI state logic
  showSuggestions = computed(() => {
    const term = this.searchTerm();
    const results = this.filteredFruits();
    // Hide if empty or if exact single match is already selected
    return term.length > 0 && !(results.length === 1 && results[0] === term);
  });

  onKeyDown(event: KeyboardEvent) {
    const results = this.filteredFruits();
    if (!this.showSuggestions() || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault(); // Prevents cursor from moving
        this.activeIndex.set((this.activeIndex() + 1) % results.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set((this.activeIndex() - 1 + results.length) % results.length);
        break;
      case 'Enter':
        if (this.activeIndex() !== -1) {
          event.preventDefault();
          this.selectFruit(results[this.activeIndex()]);
        }
        break;
      case 'Escape':
        this.activeIndex.set(-1);
        this.searchTerm.set('');
        break;
    }
  }

  selectFruit(fruit: string) {
    this.fruitControl.setValue(fruit, { emitEvent: false }); // Avoid infinite loops
    this.searchTerm.set(fruit);
    this.activeIndex.set(-1);
  }

  clearInput() {
    this.fruitControl.setValue('');
    this.searchTerm.set('');
    this.activeIndex.set(-1);
  }
}