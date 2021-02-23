import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  user: any ={}
  newUser: any = {}

  constructor(private _userServer: UserService,
    private _router: Router) { }

  ngOnInit() {
    this._userServer.getUser()
      .subscribe(
        res => this.user = res,
        err => {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }
  updateUser(user: any){
    console.log(user.birthDate.split())
    this.newUser = {
      "Firstname": user.Firstname,
      "Lastname": user.Lastname,
      "birthDate": user.birthDate,
      "City": user.City,
      "State": user.State,
      "mobileNumber": user.mobileNumber,
      "email": user.email,
      "password": user.password
    } 
    this._userServer.patchUser(this.newUser)
    .subscribe(
      res => {
        // this.newUser = res
        console.log(res)
        this.user = res
        this._router.navigate(['/users-list'])
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            alert(err.statusText)
            this._router.navigate(['/login'])
          }
      }
    }
    )
  }

  deleteUser(user: any){
    this._userServer.DeleteUser(user)
    .subscribe(
      res=> {
        console.log(res)
        localStorage.clear()
        this._router.navigate(['/login'])
      },
      err => {
        if(err instanceof HttpHeaderResponse){
          if(err.status === 500){
            alert(err.statusText)
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }
  


}
