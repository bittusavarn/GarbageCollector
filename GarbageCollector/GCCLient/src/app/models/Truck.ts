import { Address } from './Address';
import { SubMunicipality } from './SubMunicipality';
import { Garbage } from './Garbage';

export class Truck {
 public id: Number;
 public truckNumber: Number;
 public capacity: Number;
 public mobNo: String;
 public truckLocation: Address = new Address();

}
