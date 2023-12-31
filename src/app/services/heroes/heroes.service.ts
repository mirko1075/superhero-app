import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Hero, PowerStats } from '../../models/hero.model';
@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private readonly baseUrl = 'http://localhost:3000/api/heroes';
  private readonly httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getAll(searchString?: string): Observable<Hero[]> {
    let options = {};
    if (searchString) {
      const filter = {
        $or: [
          { name: { $regex: searchString, $options: 'i' } },
          { description: { $regex: searchString, $options: 'i' } },
        ],
      };
      options = { params: { filter: JSON.stringify(filter) } };
    }
    return this.http.get<Hero[]>(this.baseUrl, options);
  }

  public get(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/${id}`);
  }

  public create(data: {
    _id: string;
    name: string;
    imageName: string;
    description: string;
  }): Observable<any> {
    return this.http
      .post(this.baseUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>(`createHero`)));
  }

  public update(
    id: string,
    data: {
      _id: string;
      name: string;
      description: string;
      imageName: string;
      powerstats?: PowerStats;
    }
  ): Observable<unknown> {
    return this.http
      .put(`${this.baseUrl}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>(`updateHero`)));
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<Hero>(`deleteHero`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      throw new Error(error);
    };
  }
}
