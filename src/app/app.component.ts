import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CocktailsComponent } from './components/cocktails/cocktails.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, CocktailsComponent ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
}
