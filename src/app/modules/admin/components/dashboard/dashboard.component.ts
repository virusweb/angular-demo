import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  subscription1: Subscription;
  users: Array<any> = [];

  constructor(
    private userservice: UserService,
    private router: Router,
    private pubSub: NgxPubSubService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    
    this.subscription1 = this.pubSub.subscribe('tokenEvent', data => {
      console.log('YY', data)
    });

    this.userservice.fetchUsers().subscribe(res => {
      if(res && res.status && res.data && res.data.length > 0) {
        this.users = res.data;
      } else {
        this.users = [];
      }
    });
  }

  redirectToEdit(token): void {
    sessionStorage.setItem('userToken', token);
    this.router.navigate(['/dashboard/edit/user', token]);
  }
}
