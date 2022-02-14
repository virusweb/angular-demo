import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user: any;

  constructor(
    private authservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authservice.getLoggedUser().subscribe(res => {
      if(res && res.status && res.data) {
        this.user = res.data;
      } else {
        this.user = null;
      }
    });
  }

  doLogout():void {
    this.authservice.getLogout().subscribe(res => {
      if(res && res.status){
        localStorage.clear();
        this.router.navigate(['/']);
      }
      return false;
    })
  }
}
