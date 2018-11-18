import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../models/BaseComponent';
import { RestListener } from '../models/RestListener';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { User } from '../models/User';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent extends BaseComponent implements OnInit, RestListener {
  model: User = new User();
  constructor(private restServis: RestService) {
    super();
  }

  ngOnInit() {

  }

  register() {
    this.state.showMessage = false;
    this.state.loading = true;
    this.state.error = false;
    if (this.model.password === this.model.cnfPassword) {
         this.restServis.post(this.model, this, 'user/register', 0);
    } else {
       this.state.showMessage = true;
       this.state.loading = false;
       this.state.message = 'Confirm password is not matching to the Password';
       this.state.error = true;
    }
  }

  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
      this.state.loading = false;
    if (requestType === 0) {
      if (response.error) {
        this.showErrorMessage(response.message);
      } else {
        this.showSuccessMessage('User Successfully Registered');
      }
    }
  }

  onFailure(err: any, request: any, requestType: Number) {
    this.state.loading = false;
      if (requestType === 0) {
        this.showErrorMessage(err);
      }
    }



}
