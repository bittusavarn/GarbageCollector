import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { State } from '../models/State';
import { BaseComponent } from '../models/BaseComponent';
import { RestListener } from '../models/RestListener';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { RestService } from '../services/rest.service';


@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent extends BaseComponent implements OnInit, RestListener {
    model: User = new User();
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private restService: RestService,
        zone: NgZone
        ) { super(zone); }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.isLoggedIn()) {
            this.router.navigate([this.returnUrl]);
        }
    }

    login() {
        this.state.loading = true;
        this.state.showMessage = false;
        this.state.error = false;
        this.restService.post(this.model, this, 'user/login', 0);
    }

    onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
        this.state.loading = false;
        if (response.error === true ) {
            this.showErrorMessage(response.message);
        } else {
          const user: User = response.data;
          user.authdata = window.btoa(user.mobNo + ':' + user.password);
          this.setCurrentUser(user);
          this.router.navigate([this.returnUrl]);
        }
    }
    onFailure(err: any, request: any, requestType: Number) {
        this.state.loading = false;
        this.showErrorMessage(err);
    }

}
