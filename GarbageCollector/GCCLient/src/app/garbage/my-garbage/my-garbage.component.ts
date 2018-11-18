import { Component, OnInit } from '@angular/core';
import { Garbage } from '../../models/Garbage';
import { BaseComponent } from '../../models/BaseComponent';
import { RestListener } from '../../models/RestListener';
import { RestService } from '../../services/rest.service';
import { ResponseTemplate } from '../../models/ResponseTemplate';
import { Router } from '@angular/router';
import { TransferServiceService } from '../../services/transfer-service.service';

@Component({
  selector: 'app-my-garbage',
  templateUrl: './my-garbage.component.html',
  styleUrls: ['./my-garbage.component.css']
})
export class MyGarbageComponent extends BaseComponent implements OnInit, RestListener {
  model: Garbage[] ;
  constructor(private restService: RestService, private router: Router, private transferServce: TransferServiceService) { super(); }

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
    this.restService.get('garbage/topick', this, 0);
  }

  getTruckRoute(index) {
    this.setCurrentGarbage(this.model[index]);
    this.transferServce.garbage = this.model[index];
    this.router.navigateByUrl('truck/route?returnUrl=myGarbages');
  }

}
