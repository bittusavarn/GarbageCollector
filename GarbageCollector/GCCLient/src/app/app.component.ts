import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from './models/BaseComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'app';
  loggedIn: Boolean = false;
  constructor(zone: NgZone) {
    super(zone);

  }
  ngOnInit() {
    this.loggedIn = super.isLoggedIn();
  }
}
