import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  private _userListUrl = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

    getUsers(){
      return this.http.get<any>(this._userListUrl)
    }

}
