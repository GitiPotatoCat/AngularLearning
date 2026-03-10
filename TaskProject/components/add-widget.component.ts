import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AddCalculationService } from "../services/add-calculation.service";


@Component({
  selector: 'app-calc-widget',
  standalone: true, // Optional but recommended for clarity in v20
  imports: [FormsModule],
  template: `
    <div class="calc-container">
      <input type="number" [(ngModel)]="val1" placeholder="Number 1" />
      <input type="number" [(ngModel)]="val2" placeholder="Number 2" />
      
      <button (click)="calculate()">Add Numbers</button>

      <div class="output-window">
        @if (addService.errormessage()) {
          <p class="error">{{ addService.errormessage() }}</p>
        } @else if (addService.result() !== null) {
          <p class="success">Result: {{ addService.result() }}</p>
        } @else {
          <p>Enter values and click add</p>
        }
      </div>
    </div>
  `,
  // ... styles remain same
})
export class AddWidgetComponent {
    // Inject the service 
    protected addService = inject(AddCalculationService); 

    // Local UI State 
    val1: number | null = null; 
    val2: number | null = null; 

    calculate() {
        this.addService.addNumbers(this.val1, this.val2); 
    }
}