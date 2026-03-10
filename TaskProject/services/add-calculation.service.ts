import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root' 
}) 
export class AddCalculationService {
    result = signal<number | null>(null); 
    errormessage = signal<string | null>(null); 

    addNumbers(num1: number | null, num2: number | null): void {
        // Error handling 
        if (num1 === null  ||  num2 === null) {
            this.errormessage.set('Please enter both numbers'); 
            this.result.set(null); 
            return; 
        } 

        if (isNaN(num1) || isNaN(num2)) {
            this.errormessage.set('Invalid input: numbers only'); 
            this.result.set(null); 
            return; 
        } 

        // Success Logic 
        this.errormessage.set(null); 
        this.result.set(num1 + num2); 
    }


    clear(): void {
        this.result.set(null); 
        this.errormessage.set(null); 
    }
}