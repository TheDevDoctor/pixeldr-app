import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as data from '../testing_files/news.json';

const news = (<any>data).default;


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiKeys = {
    'newAPI.org': 'c507e7ec66c941ab996939d28c2e8ff0',
  };

  news: {articles: Array<{}>};

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer c507e7ec66c941ab996939d28c2e8ff0'
    })
  };

  baseUrl: string = 'https://newsapi.org/v2/top-headlines?';

  constructor(private http: HttpClient) {
    this.news = news;
  }

  getMedicalNews(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'country=gb&category=health', this.httpOptions)
    .pipe(
      catchError(this.handleError<any>(`Error fetching medical news from NewsAPI.org`)) // Catches HTTP errors
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
