import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/users"
  private _loginUrl = "http://localhost:3000/users/login"

  constructor(private http: HttpClient,
    private _router: Router) { }

  registerUser(user:any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser( user:any) {
    // console.log(user)
    return this.http.post<any>(this._loginUrl, user)
  }

  // update( user:any) {
  //   return this.http.patch<any>(this._updateUserUrl, user)
  // }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
