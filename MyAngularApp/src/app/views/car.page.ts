import { Component, inject } from "@angular/core"; 
import { CarService } from "../../services/car.service"; 

@Component({
    selector: 'app-car-ui', 
    template: `
        <h2>Topic: Creating Injectable Service</h2>
        <p>{{ display }}</p>
        <p>Car ID: 1 {{ carService.getCar(1) }}</p>
    `, 
}) 
export class CarUI {
    carService = inject(CarService); 
    display = this.carService.getCars().join(' ⭐️ ');
}