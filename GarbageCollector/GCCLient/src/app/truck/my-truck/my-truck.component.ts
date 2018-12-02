import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from '../../models/BaseComponent';
import { RestListener } from '../../models/RestListener';
import { Garbage } from '../../models/Garbage';
import { Truck } from '../../models/Truck';
import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import { TransferServiceService } from '../../services/transfer-service.service';
import { ResponseTemplate } from '../../models/ResponseTemplate';

@Component({
  selector: 'app-my-truck',
  templateUrl: './my-truck.component.html',
  styleUrls: ['./my-truck.component.css']
})
export class MyTruckComponent extends BaseComponent implements OnInit, RestListener {
  model: Truck[] ;
  constructor(private restService: RestService, private router: Router, private transferServce: TransferServiceService, zone: NgZone
  ) { super(zone); }

  ngOnInit() {
    this.showGarbagestOBePicked();
  }

  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
    if (response.error === false) {
      this.model = response.data;
      console.log(JSON.stringify(this.model));
    }
  }

  onFailure(err: any, request: any, requestType: Number) {

  }

  showGarbagestOBePicked() {
    this.restService.get('truck/mytrucks', this, 0);
  }

  getTruckRoute(index) {
    this.setCurrentTruck(this.model[index]);
    this.transferServce.truck = this.model[index];
    this.router.navigateByUrl('truck/route?returnUrl=myTrucks');
  }

}
