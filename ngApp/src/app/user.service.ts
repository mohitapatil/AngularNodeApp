import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userUrl = "http://localhost:3000/users/me";

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<any>(this._userUrl)
  }

  patchUser(user){
    console.log(user)
    return this.http.patch<any>(this._userUrl,user)
    
  }

  DeleteUser(user){
    console.log(user)
    return this.http.delete<any>(this._userUrl, user)
  }
}
