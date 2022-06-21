import { GoogleAuthProvider } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:AngularFireAuth , private router:Router) { }

  registerForm:FormGroup = new FormGroup({
    email: new FormControl(null , Validators.required),
    password: new FormControl(null , [Validators.required , Validators.min(6), Validators.max(18)])
  })
  ngOnInit(): void {
  }
  error:any;
  createUser(){
    const {email , password} = this.registerForm.value
    this.auth.createUserWithEmailAndPassword(email , password).then(user => {
      this.router.navigate(['home'])
    }).catch((error) => {
      this.error = error.code.split("/");
    })
  }
  createUserWithGoogle(){
    this.auth.signInWithPopup(new GoogleAuthProvider()).then(() => {
      this.router.navigate(['home'])
    })
  }

    goToLogin(){
      this.router.navigate(['/login'])
    }

}
