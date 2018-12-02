import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent } from '../../models/BaseComponent';
import { RestListener } from '../../models/RestListener';
import { ResponseTemplate } from '../../models/ResponseTemplate';
import { RouteComponent } from '../../truck/route/route.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TransferServiceService } from '../../services/transfer-service.service';
import { RestService } from '../../services/rest.service';
import { OtpVerification } from '../../models/OtpVerification';

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.css']
})
export class PickComponent extends BaseComponent implements OnInit, RestListener {
  model: OtpVerification = new OtpVerification();
  constructor(private router: Router, private transferService: TransferServiceService, private restService: RestService,
    private route: ActivatedRoute, zone: NgZone
  ) {
    super(zone);
   }


  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
    this.state.loading = false;
    if (response.error === true ) {
        this.showErrorMessage(response.message);
    } else {
      this.router.navigateByUrl('truck/route?returnUrl=myTrucks');
    }
  }
  onFailure(err: any, request: any, requestType: Number) {
    this.state.loading = false;
    this.showErrorMessage(err);

  }

  ngOnInit() {
    this.model.garbageId = this.route.snapshot.queryParams['garbageId'];
    this.model.truckId = this.route.snapshot.queryParams['truckId'];
  }
  pickGarbage() {
    this.state.loading = true;
    this.state.showMessage = false;
    this.state.error = false;
    console.log(JSON.stringify(this.model));
    this.restService.post(this.model, this, 'garbage/pick', 0);

  }

  onCancel() {
    this.router.navigateByUrl('truck/route?returnUrl=myTrucks');
  }

}
