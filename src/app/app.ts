import {Component, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardTitle} from "@angular/material/card";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, MatCardActions, MatCardTitle, MatCard, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-crud');
}
