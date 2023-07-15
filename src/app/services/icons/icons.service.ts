import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(private http: HttpClient) {}

  getIconByName(name: string): Observable<any> {
    return this.http.get(`assets/imgs/svg/${name}.svg`, {
      responseType: 'text',
    });
  }
}
