import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Garbage } from '../models/Garbage';
import { Truck } from '../models/Truck';
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {

  constructor(private router: Router) {

   }
   private data: Address = new Address();
   public truck: Truck;
   public garbage; Garbage;

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  clearData() {
    this.data = undefined;
  }

}

