import { Component  } from "@angular/core"; 
import { FruitPicker } from "../components/fruitpicker.component";

@Component({
    selector: 'app-fruit-basket-page', 
    imports: [FruitPicker], 
    template: `
        <h2>Topic: {{ topicName }} </h2> 
        <app-fruit-picker-component></app-fruit-picker-component>
    `, 
}) 
export class FruitBasket {
    protected readonly topicName = 'Angular Autocomplete (Fruit Basket example)';
}