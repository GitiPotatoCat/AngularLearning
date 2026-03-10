import { Component } from "@angular/core";

@Component({
    selector: 'about-page', 
    template: `
    <h2>{{ pageTitle }}</h2> 
    This is a practice task Angular App
    `, 
}) 
export class AboutPage {
    protected readonly pageTitle = 'About Page'; 
}