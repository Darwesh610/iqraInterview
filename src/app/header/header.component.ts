import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AngularFireAuth , private router:Router) { }

  ngOnInit(): void {
  }
  LogOut(){
    this.auth.signOut()
    this.router.navigate(['/login'])
  }

}
