import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PhotosComponent } from './photos/photos.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path:'login' , component:LoginComponent},
  { path:'register' , component:RegisterComponent},
  { path:'photos' , component:PhotosComponent , canActivate: [AngularFireAuthGuard] ,  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path:'home' , component:HomepageComponent , canActivate: [AngularFireAuthGuard] ,  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path:'' , component:HomepageComponent , canActivate: [AngularFireAuthGuard] ,  data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path:'**' , component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
