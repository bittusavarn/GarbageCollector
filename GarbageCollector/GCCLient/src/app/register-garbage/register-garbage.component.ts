import { Component, OnInit, Input } from '@angular/core';
import { TransferServiceService } from '../services/transfer-service.service';
import { Router } from '@angular/router';
import { Address } from '../models/Address';
import { Garbage } from '../models/Garbage';
import { RestService } from '../services/rest.service';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { RestListener } from '../models/RestListener';
import { BaseComponent } from '../models/BaseComponent';
import { SubMunicipality } from '../models/SubMunicipality';
import { Constants } from '../models/Constants';


@Component({
  selector: 'app-register-garbage',
  templateUrl: './register-garbage.component.html',
  styleUrls: ['./register-garbage.component.css']
})
export class RegisterGarbageComponent extends BaseComponent implements OnInit, RestListener {


   public model: Garbage = new Garbage();

  constructor(private transferService: TransferServiceService, private router: Router, private restServis: RestService) {
    super();
  }

  ngOnInit() {
      console.log(JSON.stringify('data is' + this.transferService));
      if (this.transferService.garbage) {
        this.model = this.transferService.garbage;
     }
      if (this.transferService.getData() ) {
       this.model.garbageLocation = this.transferService.getData();
      }

  }

  showOnMap() {
    this.transferService.garbage = this.model;
    this.transferService.setData(this.model.garbageLocation);
    this.router.navigateByUrl('/map?returnUrl=garbage');
  }

  register() {
    this.state.loading = true;
    this.restServis.post(this.model, this, 'garbage/register', 1);
  }

  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
    if (requestType === 1) {
     this.state.loading = false;
    if (response.error) {
      this.showErrorMessage(response.message);

    } else {

      this.showSuccessMessage('Garbage successfully Regitered Please Share OTP with truck triver when garbage is picked up .Your OTP is '
      + response.data.otp);
      this.transferService.garbage = response.data;
      this.setCurrentGarbage(response.data);
      this.router.navigateByUrl('truck/route?returnUrl=myGarbages');
    }
   }
  }
  onFailure(err: any, request: any, requestType: Number) {
    if (requestType === 1) {
      this.state.loading = false;
      this.showErrorMessage('Not able to register garbage Please try after some time or check your connectivity');
    }
  }


}
