import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  public uploadImage(formData: FormData): Observable<{ imageName: string }> {
    return this.http.post<{ imageName: string }>(
      'http://localhost:3000/api/upload',
      formData
    );
  }
}
