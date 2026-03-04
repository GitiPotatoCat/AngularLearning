import { Component } from "@angular/core";
import { CurrencyPipe, DatePipe, TitleCasePipe } from "@angular/common";

@Component({
    selector: 'app-shopping-cart-components', 
    imports: [CurrencyPipe, DatePipe, TitleCasePipe], 
    template: `
        <main>
            <h1>Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}</h1> 
            <p>Total: {{ amount | currency}}</p>
        </main>
    `, 
}) 
export class ShoppingCartComponent {
    amount = 123.45; 
    company = 'acme corporation'; 
    purchasedOn = '2024-07-08'; 
}