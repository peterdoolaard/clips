import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import IUser from "../../models/user.model";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private auth: AuthService
  ) {}

  inSubmission = false

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(12),
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
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
  alertMessage = ''
  alertColor = 'blue'

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    passwordConfirm: this.passwordConfirm,
    phoneNumber: this.phoneNumber,
  })

  async register() {
    this.inSubmission = true

    if (!this.registerForm.valid) {
      this.showAlert = true
      this.alertMessage = 'Please check the form. Not all fields are filled in correct.'
      this.alertColor = 'red'
      return
    }

    try {
      await this.auth.createUser(this.registerForm.value as IUser)

      this.showAlert = true
      this.alertMessage = 'Please wait. Your account is being created.'
      this.alertColor = 'yellow'

    } catch (error) {
      console.log(error)
      this.showAlert = true
      this.alertMessage = 'There is a problem. Please try again later.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.showAlert = true
    this.alertMessage = 'Your account has been created!'
    this.alertColor = 'green'
  }
}
