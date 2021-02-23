import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  log(x){
    console.log(x)
  }

  registerUserData:any ={};
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/users-list'])
      },
      err => {console.log(err)
        alert(err.message)
        console.log(err.message)
        // alert(err.statusText)
        this._router.navigate(['/register'])
      }
    )
  }

}
