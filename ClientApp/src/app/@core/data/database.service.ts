import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from '../classes/users';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DiscussionBoard, QuestionBankItem } from '../classes/miscellaneous';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  private baseUrl = document.getElementsByTagName('base')[0].href;

  // USER DATA FUNCTIONS --------------------------------------------------------------------------------------
  getUserData(username: string): Observable<UserData> {
    return this.http.get<UserData>(this.baseUrl + 'api/Database/GetDocument/UserData/userdata-' + username)
    .pipe(
      catchError(this.handleError<UserData>(`Error fetching user data: id=${username}`)) // Catches HTTP errors
    );
  }

  updateUserData(document: UserData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Database/UpdateDocument/UserData', JSON.stringify(document), {headers: httpOptions.headers, observe: 'response'})
    .pipe(
      catchError(this.handleError<any>(`Error updating user data: id=${document.id}`)) // Catches HTTP errors
    );
  }

  queryUserData(query: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Database/QueryDocuments/UserData/' + query)
    .pipe(
      catchError(this.handleError<any>(`Error fetching user data from query: id=${query}`)) // Catches HTTP errors
    );
  }

  // DISCUSSION BOARD FUNCTIONS -------------------------------------------------------------------------------
  getDiscussionBoard(discussionName: string): Observable<any> {
    return this.http.get<DiscussionBoard>(this.baseUrl + 'api/Database/GetDocument/DiscussionBoards/' + discussionName, {headers: httpOptions.headers, observe: 'response'})
    .pipe(
      catchError(this.handleError<DiscussionBoard>(`Error fetching user data: id=${discussionName}`)) // Catches HTTP errors
    );
  }

  queryDiscussionBoards(query: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Database/QueryDocuments/DiscussionBoards/' + query)
    .pipe(
      catchError(this.handleError<any>(`Error fetching user data from query: id=${query}`)) // Catches HTTP errors
    );
  }

  sendNewDiscussionBoard(post: DiscussionBoard): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Database/CreateIfNotExists/DiscussionBoards', JSON.stringify(post), {headers: httpOptions.headers, observe: 'response'})
    .pipe(
      catchError(this.handleError<any>(`Error fetching user data from query: id=${post.id}`)) // Catches HTTP errors
    );
  }

  updateDiscussionBoard(post: DiscussionBoard): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Database/UpdateDocument/DiscussionBoards', JSON.stringify(post), {headers: httpOptions.headers, observe: 'response'})
    .pipe(
      catchError(this.handleError<any>(`Error fetching user data from query: id=${post.id}`)) // Catches HTTP errors
    );
  }

  // QUESTION BANK FUNCTIONS ==================================================================================
  getQuestionBankItem(id: string): Observable<QuestionBankItem> {
    return this.http.get<QuestionBankItem>(this.baseUrl + 'api/Database/GetDocument/QuestionBank/' + id)
    .pipe(
      catchError(this.handleError<QuestionBankItem>(`Error fetching user data: id=${id}`)) // Catches HTTP errors
    );
  }

  updateQuestionBankItem(questionBankItem: QuestionBankItem): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'api/Database/UpdateDocument/QuestionBank', JSON.stringify(questionBankItem), {headers: httpOptions.headers, observe: 'response'})
    .pipe(
      catchError(this.handleError<any>(`Error updating user data: id=${questionBankItem.id}`)) // Catches HTTP errors
    );
  }

  queryQuestionBank(query: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/Database/QueryDocuments/QuestionBank/' + query)
    .pipe(
      catchError(this.handleError<any>(`Error fetching user data from query: id=${query}`)) // Catches HTTP errors
    );
  }

  deleteQuestionBankItem(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'api/Database/QueryDocuments/QuestionBank/' + id)
    .pipe(
      catchError(this.handleError<any>(`Error deleting question bank item: id=${id}`))
    );
  }

  // function to check url legitimacy:

  // checkUrl(link): Observable<any> {
  //   console.log('link: ' + link);
  //   return this.http.get<any>('https://' + link, {observe: 'response'})
  //   .pipe(
  //     catchError(this.handleError<any>(`Error fetching link: link=${link}`)) // Catches HTTP errors
  //   );
  // }

  // HANDLING AND LOGGING =====================================================================================

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
