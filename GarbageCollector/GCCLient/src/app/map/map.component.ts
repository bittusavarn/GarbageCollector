import { Component, OnInit, NgZone } from '@angular/core';
import { TransferServiceService } from '../services/transfer-service.service';
import { Address } from '../models/Address';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../models/BaseComponent';
import { Constants } from '../models/Constants';
declare let L;
declare let tomtom: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent extends BaseComponent implements OnInit {
  map: any = {};
  returnUrl: string;

  garbageMarker: any = {};
  garbageIcon: any = {};
  searchResult: any = {};
  constructor(private trasferService: TransferServiceService, private router: Router, private route: ActivatedRoute,  zone: NgZone) {
    super(zone);
 }
 ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.map = tomtom.L.map('map', {
      key: 'kUvfmVuGx1CpgWiTL7TKS1NegbyaOxpR',
      basePath: 'sdk',
      source: 'raster',
    }).setView([24.94, 78.04], 12);
    this.map.zoomControl.setPosition('topright');
    let iconUrl = '';
    if (this.returnUrl === 'garbage') {
      iconUrl = 'assets/images/garbage.png';
    } else {
      iconUrl = 'assets/images/truck.png';
    }
    this.garbageIcon = tomtom.L.icon({
      iconUrl: iconUrl,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
    const mapObj = this;
     this.showApproxLocation();
    this.state.loading = true;
     this.map.on('click', function (event) {
      const position = event.latlng;
      tomtom.reverseGeocode().position(position).go().then(function (results) {
        console.log('Rsults =' + JSON.stringify(results));
        mapObj.drawAddresssOnMap(results);
        mapObj.map.setView([position.lat, position.lng], 17);
      });
    });
    navigator.geolocation.getCurrentPosition((position) => {
      mapObj.map.setView([position.coords.latitude, position.coords.longitude], 17);
      const res: any = {};
      res.lat = position.coords.latitude;
      res.lon =  position.coords.longitude;
      tomtom.reverseGeocode().position(res).go().then(function (results) {
        mapObj.drawAddresssOnMap(results);
        mapObj.map.setView([res.lat, res.lon], 17);
      });
     }, (err) => {console.log(err); });
     const currloc = this.convertToLatLon(Constants.value);
     mapObj.map.setView([currloc.lat, currloc.lng], 17);
     const res1: any = {};
     res1.lat = currloc.lat;
     res1.lon =  currloc.lng;
     tomtom.reverseGeocode().position(res1).go().then(function (results) {
       mapObj.drawAddresssOnMap(results);
       mapObj.map.setView([res1.lat, res1.lon], 17);
     });
  }

 onDone() {
  this.trasferService.getData().city = this.searchResult.address.municipality;
  this.trasferService.getData().streetName = this.searchResult.address.streetName;
  this.trasferService.getData().streetNumber = this.searchResult.address.streetNumber;
  this.trasferService.getData().country = this.searchResult.address.countryCode;
  this.trasferService.getData().pin = this.searchResult.address.postalCode;
  this.trasferService.getData().lat = this.searchResult.position.lat;
  this.trasferService.getData().lon = this.searchResult.position.lng;
  this.trasferService.getData().freeformAddress = this.searchResult.freeformAddress;
  this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl']);
 }

 onCancel() {
  this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl']);
 }

   showApproxLocation() {
    const mapObj = this;

    tomtom.structuredGeocode(this.getOptions(this.trasferService.getData())).go(function (results) {
     if (results.length > 0) {
      const geoLocation: any = {};
      const result = results[0];
      geoLocation.address = result.address;
      geoLocation.position = result.position.lat + ',' + result.position.lon;
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
      this.searchResult.freeformAddress =  geoResponse.address.freeformAddress;
      this.map.removeLayer(this.garbageMarker);
      const popupContent = geoResponse.address.freeformAddress;
      this.garbageMarker = tomtom.L.marker(this.convertToLatLon(geoResponse.position), {
        icon: this.garbageIcon
      }).addTo(this.map).bindPopup(popupContent).openPopup();
      this.state.loading = false;
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
