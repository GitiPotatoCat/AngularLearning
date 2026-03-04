import { Component } from "@angular/core"; 
import { CakeListComponent } from "../components/cake-list.component";


@Component({
    selector: 'app-cakelist-page', 
    imports: [CakeListComponent], 
    template: `
        <h2>Topic: {{ pageTitle }}</h2>
        <app-cake-list-component></app-cake-list-component>
    `, 
}) 
export class CakeListPage {
    protected readonly pageTitle = 'Async Pipe (e.g.: Cake food)';
}