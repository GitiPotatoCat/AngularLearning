import { Injectable, signal, computed, effect } from '@angular/core';
import { CalcOperator } from '../models/calculator.model';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private display = signal<string>('0');
  private history = signal<string>('');
  private firstOperand = signal<number | null>(null);
  private operator = signal<CalcOperator>(null);
  private waitForSecondNumber = signal<boolean>(false);

  // Computed signals for the UI
  currentDisplay = computed(() => this.display());
  currentHistory = computed(() => this.history());

  constructor() {
    // Pro-tip: Log every calculation change for debugging
    effect(() => {
      console.log(`Display Updated: ${this.display()}`);
    });
  }

  handleInput(key: string | CalcOperator): void {
    if (key === null) return;

    if (/[0-9.]/.test(key)) {
      this.processDigit(key);
    } else {
      this.processOperator(key as CalcOperator);
    }
  }

  private processDigit(num: string): void {
    if (num === '.' && this.display().includes('.')) return;

    if (this.waitForSecondNumber()) {
      this.display.set(num);
      this.waitForSecondNumber.set(false);
    } else {
      this.display.set(this.display() === '0' && num !== '.' ? num : this.display() + num);
    }
  }

  private processOperator(nextOp: CalcOperator): void {
    const val = parseFloat(this.display());

    if (nextOp === 'AC') {
      this.clear();
      return;
    }

    if (nextOp === '+/-') {
      this.display.set(String(val * -1));
      return;
    }

    if (nextOp === '%') {
      this.display.set(String(val / 100));
      return;
    }

    if (this.firstOperand() === null) {
      this.firstOperand.set(val);
      this.history.set(`${val} ${nextOp}`);
    } else if (this.operator()) {
      const result = this.performMath(this.firstOperand()!, val, this.operator()!);
      
      if (nextOp === '=') {
        this.history.set(`${this.history()} ${val} =`);
        this.display.set(String(result));
        this.firstOperand.set(null);
        this.operator.set(null);
        return;
      }

      this.display.set(String(result));
      this.firstOperand.set(result);
      this.history.set(`${result} ${nextOp}`);
    }

    this.waitForSecondNumber.set(true);
    this.operator.set(nextOp);
  }

  private performMath(a: number, b: number, op: CalcOperator): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  }

  private clear(): void {
    this.display.set('0');
    this.history.set('');
    this.firstOperand.set(null);
    this.operator.set(null);
    this.waitForSecondNumber.set(false);
  }
}