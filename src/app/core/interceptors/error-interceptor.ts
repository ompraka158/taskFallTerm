import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar, private _errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        let error = '';
        
        if (err && err.error && err.error.responseMessage && err.error.responseMessage.message)
        error = err.error.responseMessage.message;
        if(!this._errorService.getsnackBarStatus){
            this._snackBar.open(error, err.status, {
              duration: 2000,
            });
        }
        return throwError(error);
      })
    );
  }
}
