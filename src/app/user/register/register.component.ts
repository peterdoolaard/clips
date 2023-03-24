import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl('', [
    Validators.required,
    Validators.min(12),
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  passwordConfirm = new FormControl('', [
    Validators.required
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)
  ])

  showAlert = false
  alertMessage = 'Please wait. Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    passwordConfirm: this.passwordConfirm,
    phoneNumber: this.phoneNumber,
  })

  register() {
    if (!this.registerForm.valid) {
      this.showAlert = true
      this.alertMessage = 'Please check the form. Not all fields are filled in correct.'
      this.alertColor = 'red'
      return
    }
    this.showAlert = true
    this.alertMessage = 'Please wait. Your account is being created.'
    this.alertColor = 'yellow'
  }
}
