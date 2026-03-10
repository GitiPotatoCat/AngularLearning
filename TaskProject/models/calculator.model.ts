export type CalcOperator = '+' | '-' | '*' | '/' | '=' | 'AC' | '+/-' | '%' | null;

export interface CalculatorState 
{
  display: string;
  history: string; 
  firstOperand: number | null;
  operator: CalcOperator;
  waitForSecondNumber: boolean;
}