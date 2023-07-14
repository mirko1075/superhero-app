import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Hero } from "../models/hero.model";
@Injectable({
  providedIn: "root",
})
export class HeroesService {
  private readonly baseUrl = "http://localhost:3000/api/heroes";
  private readonly httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl);
  }

  public get(id: String): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/${id}`);
  }

  public create(data: { Id: String; Name: String }): Observable<any> {
    return this.http
      .post(this.baseUrl, data, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>(`createHero`)));
  }

  public update(
    id: String,
    data: { Id: String; Name: String }
  ): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError<Hero>(`updateHero`)));
  }

  public delete(id: String): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<Hero>(`deleteHero`)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      throw new Error(error);
    };
  }
}
