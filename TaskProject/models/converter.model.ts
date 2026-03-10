export type UnitCategory = 'Length' | 'Mass' | 'Temperature';

export interface Unit 
{
  label: string;
  value: string;
  factor: number; // Factor relative to base (e.g., 1 meter)
}

export interface ConversionResult 
{
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
}