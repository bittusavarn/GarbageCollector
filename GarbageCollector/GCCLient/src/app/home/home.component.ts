import { Component, OnInit, NgZone } from '@angular/core';
import {Router } from '@angular/router';
import { BaseComponent } from '../models/BaseComponent';
import { User } from '../models/User';


@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent extends BaseComponent implements OnInit {

   model: User ;
    ngOnInit() {
        this.model = JSON.parse(super.getCurrentUser());
    }
    constructor(private router: Router, zone: NgZone
    ) {
        super(zone);
    }

    logout() {
        super.logout();
        this.router.navigate(['/login']);
    }
}
