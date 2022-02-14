import { Injectable } from '@angular/core';
import { Countries } from '../models/countries.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  
  constructor(private http: HttpClient) { }

  getCountries():any {
    return this.http.get<Countries>(`${environment.baseUrl}/countries/list.php`);
  }

  addCountry(data): any {
    return this.http.post<Countries>(`${environment.baseUrl}/countries/save.php`, data);
  }

  editCountry(data): any {
    return this.http.post<Countries>(`${environment.baseUrl}/countries/edit.php`, data);
  }

  deleteCountry(id): any {
    return this.http.post<Countries>(`${environment.baseUrl}/countries/delete.php`, { id:id });
  }
}
