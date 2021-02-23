import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../users-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users:any = []
  constructor(private _userListServer: UsersListService,
    private _router: Router) { }

  ngOnInit() {
    this._userListServer.getUsers()
      .subscribe(
        res => this.users = res,
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

}
