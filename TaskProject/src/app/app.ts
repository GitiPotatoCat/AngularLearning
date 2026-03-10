import { Component, signal } from '@angular/core'; 
import { NavbarComponent } from '../../components/navbar.component'; 
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  template: `
  <app-navbar />
  
  <div class="page-container">
    <router-outlet />
  </div>
  `,
  imports: [RouterOutlet, NavbarComponent], 
  styles: `
    .page-container { padding: 20px; }
  `, 
})
export class App {
  protected readonly title = signal('TaskProject');
}
