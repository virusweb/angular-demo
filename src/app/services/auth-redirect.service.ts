import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {

    if (this.authService.checkForLoggedIn()) {

      if(this.authService.getRole() == 'admin') {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/home'])
      }
    }
    return true;
  }
}
