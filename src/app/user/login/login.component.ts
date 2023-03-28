import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  }

  formIsValid = true;

  login() {
    if (this.credentials.email.length > 0 && this.credentials.password.length > 0) {
      console.log(this.credentials)
      return this.formIsValid = true
    }
    console.log('not valid')
    return this.formIsValid = false
  }
}
