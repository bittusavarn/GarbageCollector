import { Address } from './Address';
import { SubMunicipality } from './SubMunicipality';

export class Garbage {
    public mobNo: String;
    public garbageLocation: Address = new Address();
    public submunicipality: SubMunicipality = new SubMunicipality();
}
