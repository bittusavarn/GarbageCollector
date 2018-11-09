import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../models/BaseComponent';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { TransferServiceService } from '../services/transfer-service.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent extends BaseComponent implements OnInit {
  model: any = {};
  constructor(private transferService: TransferServiceService, private router: Router, private restServis: RestService) {super(); }

  ngOnInit() {
  }

  onDone() {
    this.state.loading = true;
    this.restServis.get('truck/detail?number=' + this.model.truckNo, this , 0);
  }

  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
     this.state.loading = false;
     if (response.error === false) {
      this.transferService.setTruck(response.data);
      this.router.navigateByUrl('/truck/route');

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
