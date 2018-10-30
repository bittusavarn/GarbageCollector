import { Component, OnInit } from '@angular/core';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
       ngOnInit() {
    }

    deleteUser(id: number) {
    }

    private loadAllUsers() {
    }
}
