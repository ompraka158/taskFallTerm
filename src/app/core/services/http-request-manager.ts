import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpRequestManager {
  constructor(private http: HttpClient) {}
  public get(url): Observable<any> {
    return this.http.get(url).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  public put(url, body): Observable<any> {
    return this.http.put(url, body).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  public post(url, body): Observable<any> {
    return this.http.post(url, body).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  public delete(url): Observable<any> {
    return this.http.delete(url).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
