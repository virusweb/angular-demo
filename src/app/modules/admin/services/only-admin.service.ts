import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnlyAdminService implements CanActivate  {

  constructor(private router: Router, private authservice: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot): boolean {

    let loggedRole = this.authservice.getRole();
    let allowedRole = next.data.role;

    if (loggedRole && loggedRole == allowedRole) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
