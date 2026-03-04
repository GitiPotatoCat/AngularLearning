import { Component, signal } from '@angular/core'; 
import { CustomForms } from './views/customforms.page';
import { CarUI } from './views/car.page'; 
import { TopicPipes } from './views/topicpipes.page'; 
import { FruitBasket } from './views/fruitbasket.page'; 
import { CakeListPage } from './views/cakelist.page'; 
import { BikeShowroomPage } from './views/bikeshowroom.page';
// import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  // templateUrl: './app.html',  
  template: ` 
    <h1>{{ title() }}</h1>
    <app-custom-forms></app-custom-forms> 
      <hr>
    <app-car-ui></app-car-ui> 
      <hr>
    <app-topic-pipes></app-topic-pipes> 
      <hr>
    <app-fruit-basket-page></app-fruit-basket-page> 
      <hr> 
    <app-cakelist-page></app-cakelist-page> 
      <hr> 
    <app-bike-showroom-page></app-bike-showroom-page>
  `,  
  
  // styleUrl: './app.css', 
  imports: [CustomForms, CarUI, TopicPipes, FruitBasket, CakeListPage, BikeShowroomPage]
})


export class App {
  protected readonly title = signal('MyAngularApp'); 
}
