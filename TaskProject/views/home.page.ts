import { Component } from "@angular/core";

@Component({
    selector: 'home-page', 
    template: `
    <h2>{{ pageTitle }}</h2> 
    Welcome to Angular App
    `, 
}) 
export class HomePage {
    protected readonly pageTitle = 'Home Page'; 
}