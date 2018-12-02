import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from '../models/BaseComponent';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { TransferServiceService } from '../services/transfer-service.service';
import { Truck } from '../models/Truck';
import { Constants } from '../models/Constants';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent extends BaseComponent implements OnInit {
  model: Truck = new Truck();
  constructor(private transferService: TransferServiceService, private router: Router, private restServis: RestService, zone: NgZone
  ) {super(zone); }

  ngOnInit() {
    if (this.transferService.truck) {
      this.model = this.transferService.truck;
   }
    if (this.transferService.getData() ) {
     this.model.truckLocation = this.transferService.getData();
    }
  }

  onDone() {
    this.state.loading = true;
    this.restServis.post(this.model, this, 'truck/register', 0);
  }

  showOnMap() {
    this.transferService.truck = this.model;
    this.transferService.setData(this.model.truckLocation);
    this.router.navigateByUrl('/map?returnUrl=truck');
  }

  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
     this.state.loading = false;
     if (response.error === false) {
      this.showSuccessMessage('This truck is successfully registsred and can pick garbages assigned to it.' +
      'Please check truck route and send live location of truck for other user in My truck');
    } else {
      this.showErrorMessage(
      response.message);
     }

  }
  onFailure(err: any, request: any, requestType: Number) {
    this.state.loading = false;
    this.showErrorMessage('Not able to Get truck Route ' +
    'please try after some time or check your connectivity');
  }

}
