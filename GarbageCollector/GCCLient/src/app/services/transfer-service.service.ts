import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Garbage } from '../models/Garbage';
import { Truck } from '../models/Truck';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {

  constructor(private router: Router) {

   }
   private data: Garbage = new Garbage();
   private truck: Truck = new Truck();

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = undefined;
  }

  setTruck(truck) {
    this.truck = truck;
  }

  getTruck() {
    return this.truck;
  }
}

