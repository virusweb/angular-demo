import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userservice: UserService, private http: HttpClient) {}

  getAuthenticate(username, password): any {
    return this.http.post<any>(`${environment.baseUrl}/users/login.php`, { username:username, password:password });
  }

  getLogout(): any {
    return this.http.post<any>(`${environment.baseUrl}/users/logout.php`, null);
  }

  isLoggedIn(): any {
    let token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  checkForAdmin(): any {
    let role = this.getRole();
    if (role == 'admin') {
      return true;
    }
    return false;
  }

  checkForLoggedIn(): boolean {
    let token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  private getToken(): string {
    return localStorage.getItem("token");
  }

  getRole(): string {
    return localStorage.getItem("role");
  }

  getLoggedUser(): any {
    const token = this.getToken();
    return this.userservice.getSingleUser(token);
  }

  register(data): any {
    return this.http.post<any>(`${environment.baseUrl}/users/register.php`, data);
  }

  checkEmail(email): any {
    return this.http.post<any>(`${environment.baseUrl}/users/checkemail.php`, {email : email});
  }

  fetchUsersNew(): any {
    return this.http.get<any>(`https://app.pricerite.com.hk/hk/zh/magemobapp/homepage/getstoredetail`);
  }
}
