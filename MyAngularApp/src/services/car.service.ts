import { Injectable  } from "@angular/core"; 

@Injectable({
    providedIn: 'root'
}) 
export class CarService {
    cars = ['Eicher Motors', 'BharatBenz', 'Ashokleyland' ]; 

    getCars(): string[] {
        return this.cars;
    } 

    getCar(id: number) {
        return this.cars[id];
    }
}