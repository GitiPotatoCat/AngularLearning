import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' }) 
export class FruitService {
    private basket = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig', 'Grape']; 

    getFruits(): string[] {
        return this.basket;
    }
}