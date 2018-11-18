import { Component, OnInit } from '@angular/core';
import { TransferServiceService } from '../../services/transfer-service.service';
import { Truck } from '../../models/Truck';
import { Garbage } from '../../models/Garbage';
import { Address } from '../../models/Address';
import { BaseComponent } from '../../models/BaseComponent';
import { RestService } from '../../services/rest.service';
import { ResponseTemplate } from '../../models/ResponseTemplate';
import { RestListener } from '../../models/RestListener';
import { ActivatedRoute, Router } from '@angular/router';
declare let L;
declare let tomtom: any;


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent extends BaseComponent implements RestListener, OnInit {
  static map: any = {};
  returnUrl: string;
  truckMarker: any = {};

  constructor(private transferService: TransferServiceService, private restService: RestService, private router: Router,
     private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    console.log(JSON.stringify(this.transferService.truck));
    RouteComponent.map = tomtom.L.map('map', {
      key: 'kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR',
      basePath: 'sdk',
      source: 'raster'
    });
    RouteComponent.map.zoomControl.setPosition('topright');
    tomtom.routingKey('kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (this.returnUrl === 'myGarbages') {
    if (!this.transferService.garbage) {
      this.transferService.garbage = this.getCurrentGarbage();
    }
    this.getAllGarbagetoBePickedupByTruckWithId(this.transferService.garbage.truck.id);
   } else {
    if (!this.transferService.truck) {
      this.transferService.truck = this.getCurrentTruck();
    }
    this.getAllGarbagetoBePickedupByTruckWithId(this.transferService.truck.id);
   }
  }

  private getAllGarbagetoBePickedupByTruckWithId(truckId: Number) {
    this.restService.get('garbage/topickbytruck?truckId=' + truckId, this, 0);
  }

  private getLocations(garbages: Garbage[]) {
        let  locationsRequest = '';
        if (this.returnUrl === 'myGarbages') {
          const truck: Truck  = this.transferService.garbage.truck;
          const  startLocation = truck.truckLocation.lat + ',' + truck.truckLocation.lon;
          locationsRequest = locationsRequest + startLocation ;

        } else {
          const truck: Truck  = this.transferService.truck;
          const  startLocation = truck.truckLocation.lat + ',' + truck.truckLocation.lon;
          locationsRequest = locationsRequest + startLocation ;
          for (const gb of garbages) {
            locationsRequest = locationsRequest + ':' + gb.garbageLocation.lat +
          ',' + gb.garbageLocation.lon;
          }
        }
        if (this.returnUrl === 'myGarbages') {
          locationsRequest = locationsRequest + ':' + this.transferService.garbage.garbageLocation.lat +
        ',' + this.transferService.garbage.garbageLocation.lon;
        }
        return locationsRequest;
  }

  private  showAllGarbage(garbages: Garbage[]) {
    let truck: Truck = null;
    if (this.returnUrl === 'myGarbages') {
      truck = this.transferService.garbage.truck;

    } else {
      truck = this.transferService.truck;
    }
      for (const gb of garbages) {
        if (this.returnUrl === 'myGarbages') {
          console.log('Grabgae id' + gb.id);
          if (gb.id === this.transferService.garbage.id) {
            this.drawAddresssOnMap(gb.garbageLocation, 2
              , ' Garbage of ' + gb.garbageweight +  'kg at ' + gb.garbageLocation.freeformAddress + ' and otp is ' + gb.otp, null);
            } else {
              this.drawAddresssOnMap(gb.garbageLocation, 0
                , ' Garbage of ' + gb.garbageweight +  'kg at ' + gb.garbageLocation.freeformAddress, null);
            }
        } else {
          this.drawAddresssOnMap(gb.garbageLocation, 0
            , ' Garbage of ' + gb.garbageweight +  'kg at ' + gb.garbageLocation.freeformAddress +
             ' Click to enter otp and pick the garbage', gb);
        }


      }
      this.drawAddresssOnMap(truck.truckLocation, 1, 'Truck number ' +
       truck.truckNumber + ' of maximum capacity ' + truck.capacity
       + 'kg is on the way .Contact truck driver on ' + truck.mobNo, null);
       if (this.returnUrl === 'myGarbages') {
        this.getTruckLocation(truck);
      } else {
        this.updateTruckLocation(truck);
      }
  }

  convertToLatLon(coordinateString) {
    const result = coordinateString.split(',');
    return {
      lat: parseFloat(result[0]),
      lng: parseFloat(result[1])
    };
  }

  updateTruckLocation(truck: Truck) {
    const component = this;
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const res: any = {};
        res.lat = position.coords.latitude;
        res.lon =  position.coords.longitude;
        tomtom.reverseGeocode().position(res).go().then(function (results) {
          const address: Address =  new Address();
          if (results && results.address && results.address.freeformAddress) {
            address.city = results.address.municipality;
            address.streetName = results.address.streetName;
            address.streetNumber = results.address.streetNumber;
            address.country = results.address.countryCode;
            address.pin = results.address.postalCode;
            const pos = component.convertToLatLon(results.position);
            address.lat = pos.lat;
            address.lon = pos.lng;
            console.log('results = ' + JSON.stringify(results));
            address.freeformAddress = results.address.freeformAddress;
            component.transferService.truck.truckLocation = address;
            RouteComponent.map.removeLayer(component.truckMarker);
            component.drawAddresssOnMap(address, 1, 'Truck number ' +
            component.transferService.truck.truckNumber + ' of maximum capacity ' + truck.capacity
            + 'kg is on the way .Contact truck driver on ' + truck.mobNo, null) ;
            component.restService.post(component.transferService.truck, component, 'truck/updateLocation', 2);
          }

        });
       }, (err) => {console.log(err); });
    }, 1000);
  }

  getTruckLocation(truck: Truck) {
    console.log('truck object is' + JSON.stringify(truck));
    const component = this;
    setInterval(() => {
      component.restService.get('truck/getLocation?truckId=' + truck.id, component, 3);
   }, 1000);
  }

  drawAddresssOnMap(address: Address, type: Number, content: String, garbage: Garbage) {
     const latLon =  {
      lat: address.lat,
      lng: address.lon
    };
      let icon = 'assets/images/trashcan.png';
      if (type === 2) {
        icon = 'assets/images/garbage.png';
      } else if (type === 1) {
        icon = 'assets/images/truck.png';
      }
     const garbageIcon: any = tomtom.L.icon({
      iconUrl: icon,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

      const marker = tomtom.L.marker(latLon, {
        icon: garbageIcon
      }).addTo(RouteComponent.map);
      this.truckMarker = marker;
      marker.on('mouseover', function(e) {
        L.popup()
            .setLatLng(e.latlng)
            .setContent(content)
            .openOn(RouteComponent.map);
    });

    if (type !== 1 && this.returnUrl !== 'myGarbages') {
      const component = this;
      marker.on('click', function(e) {
        component.router.navigateByUrl('garbage/pick?truckId=' + component.transferService.truck.id + '&garbageId='
        + garbage.id);
    });
    }


  }





  bindPopups(feature, layer) {
    layer.on('mouseover', function(e) {
        L.popup()
            .setLatLng(e.latlng)
            .setContent([
              'Distance: ' + tomtom.unitFormatConverter.formatDistance(feature.properties.summary.lengthInMeters),
              'Estimated travel time: ' + tomtom.unitFormatConverter.formatTime(feature.properties.summary.travelTimeInSeconds),
              'Traffic delay: ' + tomtom.unitFormatConverter.formatTime(feature.properties.summary.trafficDelayInSeconds)
          ].join('<br/>'))
            .openOn(RouteComponent.map);
    });
}

   onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
      const mapObj = this;
    if (!response.error) {
        if (requestType === 0) {
              const garbages: Garbage[] = response.data;
              console.log('garbages = ' + JSON.stringify(garbages));
              if (!garbages || garbages.length === 0) {
                this.drawAddresssOnMap(this.transferService.truck.truckLocation, 1, 'Truck number ' +
                this.transferService.truck.truckNumber + ' of maximum capacity ' + this.transferService.truck.capacity
                + 'kg is here contact driver on ' + this.transferService.truck.mobNo, null);
                return;
              }
              tomtom.routing({
                    traffic: false
                })
              .locations(this.getLocations(garbages))
              .go()
              .then(function(routeJson) {
                 const  route = tomtom.L.geoJson(routeJson, {
                  onEachFeature: mapObj.bindPopups,
                      style: {color: '#F020E8', opacity: 0.8}
                  }).addTo(RouteComponent.map);
                  console.log('route is ' + JSON.stringify(routeJson));
                  RouteComponent.map.fitBounds(route.getBounds(), {padding: [5, 5]});
              });
            this.showAllGarbage(garbages);
           } else if ( requestType === 3) {
            RouteComponent.map.removeLayer(this.truckMarker);
            this.drawAddresssOnMap(response.data, 1, 'Truck number ' +
            this.transferService.garbage.truck.truckNumber + ' of maximum capacity ' + this.transferService.garbage.truck.capacity
            + 'kg is on the way .Contact truck driver on ' + this.transferService.garbage.truck.mobNo, null) ;
           }
        }
  }
   onFailure(err: any, request: any, requestType: Number) {

  }

  onCancel() {
     this.router.navigateByUrl(this.returnUrl);
  }

}
