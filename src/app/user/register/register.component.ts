import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {
  }

  inSubmission = false

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

    const {email, password} = this.registerForm.value

    try {
      this.showAlert = true
      this.alertMessage = 'Please wait. Your account is being created.'
      this.alertColor = 'yellow'
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email as string,
        password as string
      )

      await this.db.collection('users').add({
        name: this.name.value,
        email: this.email.value,
        age: this.age.value,
        phoneNumber: this.phoneNumber.value
      })
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
