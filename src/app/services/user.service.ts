import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class UserService {

  transferMovie = new Subject();
  transferData = new Subject();
  constructor(private http: HttpClient) { }

  getSingleUser(token): any {
    return this.http.post<any>(`${environment.baseUrl}/users/profile.php`, {token:token});
  }
  

  fetchUsers(): any {
    return this.http.get<User>(`${environment.baseUrl}/users/list.php`);
  }
}
