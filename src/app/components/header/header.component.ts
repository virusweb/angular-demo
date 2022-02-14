import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  isLoggedIn$: boolean = false;
  isAdmin$:boolean = false;

  constructor(public authservice: AuthService, private router: Router, private cd: ChangeDetectorRef,) { }

  doLogout():void {
    this.authservice.getLogout().subscribe(res => {
      if(res && res.status){
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/']);
      }
      return false;
    })
  }
}
