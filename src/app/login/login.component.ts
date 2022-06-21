import { Component, OnInit } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AngularFireAuth , private router:Router) { }

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , Validators.required),
    password: new FormControl(null , [Validators.required , Validators.min(6), Validators.max(18)])
  })
  ngOnInit(): void {
  }
  error:any;
  currentUser:any;
  createUser(){
    const {email , password} = this.loginForm.value
    this.auth.signInWithEmailAndPassword(email , password).then(user => {
      this.currentUser = user
      localStorage.setItem("user" , JSON.stringify(user));
      this.router.navigate(['home'])
    }).catch((error) => {
      this.error = error.code.split("/");})
  }
    goToRegister(){
      this.router.navigate(['/register'])
    }
    loginwithGoogle(){
      this.auth.signInWithPopup(new GoogleAuthProvider()).then((userInfo) => {
        this.router.navigate(['home'])
      })
    }

}
