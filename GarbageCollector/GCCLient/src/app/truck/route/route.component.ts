import { Component, OnInit } from '@angular/core';
import { TransferServiceService } from '../../services/transfer-service.service';
import { Truck } from '../../models/Truck';
import { Garbage } from '../../models/Garbage';
import { Address } from '../../models/Address';
declare let L;
declare let tomtom: any;


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  map: any = {};

  constructor(private transferService: TransferServiceService) { }

  ngOnInit() {
    console.log(JSON.stringify(this.transferService.getTruck()));
    this.map = tomtom.L.map('map', {
      key: 'kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR',
      basePath: 'sdk',
      source: 'raster'
    });
    const mapObj = this.map;
    tomtom.routingKey('kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR');
    console.log('Show Route for' + this.getLocations());
    tomtom.routing({traffic: false})
            .locations(this.getLocations())
            .go()
            .then(function(routeJson) {
               const  route = tomtom.L.geoJson(routeJson, {
                    style: {color: '#F020E8', opacity: 0.8}
                }).addTo(mapObj);
                mapObj.fitBounds(route.getBounds(), {padding: [5, 5]});
            }
            );
     this.showAllGarbage();
  }

  private getLocations() {
        let  locationsRequest = '';
        const truck: Truck  = this.transferService.getTruck();
        const  startLocation = truck.startLocation.lat + ',' + truck.startLocation.lon;
        const endLocation = truck.endLocation.lat + ',' + truck.endLocation.lon;
        locationsRequest = locationsRequest + startLocation + ':' + endLocation;
        for (const garbage of truck.garbages ) {
          locationsRequest = locationsRequest + ':' + garbage.garbageLocation.lat + ',' + garbage.garbageLocation.lon;
        }
        return locationsRequest;
  }

  private  showAllGarbage() {
    const truck: Truck  = this.transferService.getTruck();
    for (const garbage of truck.garbages ) {
      this.drawAddresssOnMap(garbage.garbageLocation);
    }
  }

  drawAddresssOnMap(address: Address) {
     const latLon =  {
      lat: address.lat,
      lng: address.lon
    };

     const garbageIcon: any = tomtom.L.icon({
      iconUrl: 'assets/sdk/images/marker-icon.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

      tomtom.L.marker(latLon, {
        icon: garbageIcon
      }).addTo(this.map);

  }

}
