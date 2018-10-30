export class BaseComponent {
    state: any =  {};
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
}
