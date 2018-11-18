import { Address } from './Address';
import { SubMunicipality } from './SubMunicipality';
import { Truck } from './Truck';

export class Garbage {
    public id: Number ;
    public garbageLocation: Address = new Address();
    public garbageweight: Number;
    public truck: Truck;
    public otp: String;
}
