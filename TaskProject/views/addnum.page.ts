import { Component } from "@angular/core";
import { AddWidgetComponent } from "../components/add-widget.component";

@Component({
    selector: `add-number-page`, 
    template: `
    <h2>Task: {{ pageTitle }}</h2> 
    <h5>{{ pageSubTitle }}</h5>
    <main>
      <h1>Math Operations</h1>
      <p>Welcome to the v20 Calculator Page</p>
      
      <app-calc-widget />
    </main>
    `, 
    styles: `
    main { max-width: 600px; margin: 0 auto; font-family: sans-serif; }
    `, 
    imports: [AddWidgetComponent], 
}) 
export class AddNumPage {
    protected readonly pageTitle = "Addition of two number"; 
    protected readonly pageSubTitle = "Using two input box and one output box with button"; 
}