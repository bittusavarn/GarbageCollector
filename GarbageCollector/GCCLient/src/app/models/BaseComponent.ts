import { State } from './State';
import { User } from './User';
import { TransferServiceService } from '../services/transfer-service.service';
import { Garbage } from './Garbage';
import { Truck } from './Truck';

export class BaseComponent {
    state: State =  new State();
     constructor() {
        this.resetState();
     }

    resetState() {
        this.state.message = '';
        this.state.showMessage = false;
        this.state.error = false;
   }

   showMessage(message: String, error: boolean ) {
    this.state.message = message;
    this.state.showMessage = true;
    this.state.error = error;

   }

   showErrorMessage(message: String) {
     this.showMessage(message, true);
   }

   showSuccessMessage(message: String) {
    this.showMessage(message, false);
   }

   setCurrentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
   }

   getCurrentUser(): string {
      return localStorage.getItem('currentUser');
   }

   isLoggedIn(): Boolean {
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      return false;
   }

   logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('garbage');
    localStorage.removeItem('truck');
   }

   setCurrentGarbage(garbage: Garbage) {
    localStorage.setItem('garbage', JSON.stringify(garbage));
   }
   setCurrentTruck(truck: Truck) {
    localStorage.setItem('truck', JSON.stringify(truck));
   }

   getCurrentGarbage() {
    return JSON.parse(localStorage.getItem('garbage'));
   }
   getCurrentTruck() {
    return JSON.parse(localStorage.getItem('truck'));
   }

}
