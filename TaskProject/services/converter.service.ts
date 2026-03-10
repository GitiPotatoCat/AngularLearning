import { Injectable, signal, computed } from '@angular/core';
import { Unit, UnitCategory } from '../models/converter.model';

@Injectable({ providedIn: 'root' })
export class ConverterService 
{
  // 1. Data Definitions
  private readonly unitsMap: Record<UnitCategory, Unit[]> = {
    Length: [
      { label: 'Meters', value: 'm', factor: 1 },
      { label: 'Kilometers', value: 'km', factor: 1000 },
      { label: 'Miles', value: 'mi', factor: 1609.34 },
      { label: 'Feet', value: 'ft', factor: 0.3048 }
    ],
    Mass: [
      { label: 'Grams', value: 'g', factor: 1 },
      { label: 'Kilograms', value: 'kg', factor: 1000 },
      { label: 'Pounds', value: 'lb', factor: 453.592 }
    ],
    Temperature: [] // Handled via special logic in conversion method
  };

  // 2. Reactive State
  category = signal<UnitCategory>('Length');
  inputAmount = signal<number>(1);
  fromUnit = signal<string>('m');
  toUnit = signal<string>('km');

  // 3. Derived State (Computed)
  availableUnits = computed(() => this.unitsMap[this.category()]);

  convertedValue = computed(() => {
    const amount = this.inputAmount();
    const cat = this.category();
    const units = this.availableUnits();
    
    const uFrom = units.find(u => u.value === this.fromUnit());
    const uTo = units.find(u => u.value === this.toUnit());

    if (!uFrom || !uTo) return 0;

    // Standard Conversion: (Value * FromFactor) / ToFactor
    const baseValue = amount * uFrom.factor;
    return baseValue / uTo.factor;
  });

  setCategory(cat: UnitCategory) 
  {
    this.category.set(cat);
    const newUnits = this.unitsMap[cat];
    this.fromUnit.set(newUnits[0].value);
    this.toUnit.set(newUnits[1].value);
  }
}