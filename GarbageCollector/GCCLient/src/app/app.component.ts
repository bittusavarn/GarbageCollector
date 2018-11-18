import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './models/BaseComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'app';
  loggedIn: Boolean = false;

  ngOnInit() {
    this.loggedIn = super.isLoggedIn();
  }
}
