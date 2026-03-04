import { UpperCasePipe } from "@angular/common"; 
import { LowerCasePipe } from "@angular/common";
import { Component } from "@angular/core"; 
import { ShoppingCartComponent } from "../components/shoppingcart.component";

@Component({
    selector: 'app-topic-pipes',
    template: `
        <h1 style="font-family: 'Segoe UI'; color: olivedrab;">Topic: {{ title | uppercase }}</h1> 
        <h4 style="font-family: 'Trebuchet MS'; color: lightseagreen;">{{ subtitle | lowercase }}</h4> 
        <app-shopping-cart-components></app-shopping-cart-components>
    `, 
    imports: [UpperCasePipe, LowerCasePipe, ShoppingCartComponent], 
}) 
export class TopicPipes {
    protected readonly title = 'Pipes'; 
    protected readonly subtitle = 'Learning Angular is great'; 
}