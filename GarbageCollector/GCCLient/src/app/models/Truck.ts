import { Address } from './Address';
import { SubMunicipality } from './SubMunicipality';
import { Garbage } from './Garbage';

export class Truck {
 public id: Number;
 public startLocation: Address;
 public endLocation: Address;
 public truckNumber: Number;
 public submunicipality: SubMunicipality;
 public garbages: Garbage[];

}
