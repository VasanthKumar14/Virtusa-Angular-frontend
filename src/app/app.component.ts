import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private route: Router) {}
  title = 'frontend';
  isLogged: boolean = true;

  myfun() {
    console.warn('Is this Working?');
    this.isLogged = !this.isLogged;
    this.route.navigateByUrl('/login');
  }
}
