import { Component, OnInit } from '@angular/core';
import { TransferServiceService } from '../services/transfer-service.service';
import { Address } from '../models/Address';
import { Router } from '@angular/router';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any = {};
  garbageMarker: any = {};
  garbageIcon: any = {};
  searchResult: any = {};
   constructor(private trasferService: TransferServiceService, private router: Router) {
  }

  ngOnInit() {
    this.map = tomtom.L.map('map', {
      key: 'kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR',
      basePath: 'sdk',
      source: 'raster',
    }).setView([24.94, 78.04], 12);

    this.garbageIcon = tomtom.L.icon({
      iconUrl: 'assets/sdk/images/marker-icon.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
    const mapObj = this;
     this.showApproxLocation();
     this.map.on('click', function (event) {
      const position = event.latlng;
      tomtom.reverseGeocode().position(position).go().then(function (results) {
        console.log('Rsults =' + JSON.stringify(results));
        mapObj.drawAddresssOnMap(results);
        mapObj.map.setView([position.lat, position.lng], 12);
      });
    });

  }

 onDone() {
  this.trasferService.getData().garbageLocation.city = this.searchResult.address.municipality;
  this.trasferService.getData().garbageLocation.streetName = this.searchResult.address.streetName;
  this.trasferService.getData().garbageLocation.streetNumber = this.searchResult.address.streetNumber;
  this.trasferService.getData().garbageLocation.country = this.searchResult.address.countryCode;
  this.trasferService.getData().garbageLocation.pin = this.searchResult.address.postalCode;
  this.trasferService.getData().garbageLocation.lat = this.searchResult.position.lat;
  this.trasferService.getData().garbageLocation.lon = this.searchResult.position.lng;
  this.router.navigateByUrl('/garbage');
 }


   showApproxLocation() {
    const mapObj = this;

    tomtom.structuredGeocode(this.getOptions(this.trasferService.getData().garbageLocation)).go(function (results) {
     if (results.length > 0) {
      const geoLocation: any = {};
      const result = results[0];
      geoLocation.address = result.address;
      geoLocation.position = result.position.lat + ',' + result.position.lon;
      mapObj.drawAddresssOnMap(geoLocation);
     }
  }) ;
 }

   getResultAddress(result) {
    if (typeof result.address === 'undefined') {
        return '';
    }
    const  address = [];
    if (typeof result.address.freeformAddress !== 'undefined') {
        address.push(result.address.freeformAddress);
    }
    if (typeof result.address.countryCodeISO3 !== 'undefined') {
        address.push(result.address.countryCodeISO3);
    }
    return address.join(', ');
}

  convertToLatLon(coordinateString) {
    const result = coordinateString.split(',');
    return {
      lat: parseFloat(result[0]),
      lng: parseFloat(result[1])
    };
  }
  drawAddresssOnMap(geoResponse) {
    if (geoResponse && geoResponse.address && geoResponse.address.freeformAddress) {
      this.searchResult.address  = geoResponse.address;
      this.searchResult.position = this.convertToLatLon(geoResponse.position);

      this.map.removeLayer(this.garbageMarker);
      const popupContent = geoResponse.address.freeformAddress;
      this.garbageMarker = tomtom.L.marker(this.convertToLatLon(geoResponse.position), {
        icon: this.garbageIcon
      }).addTo(this.map).bindPopup(popupContent).openPopup();
    }
  }


/*
 * Gets entered options from form fields
 */
 getOptions(query: Address) {
    const options: any = {unwrapBbox: true};
    const selectedLangCode = 'en-US';
    options.countryCode = query.country;
    options.streetName = query.streetName;
    options.streetNumber = query.streetNumber;
    options.municipality = query.city;
    options.postalCode = query.pin;
    options.limit = 10;
    options.language = selectedLangCode;
    if (query.lat !== undefined && query.lon !== undefined ) {
      options.lat = query.lat;
      options.lon = query.lon;
    } else {
      options.lat = this.map.getCenter().lat;
      options.lon = this.map.getCenter().lng;
    }
    return options;
}




}
