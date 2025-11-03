import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IRequest } from './request.interface';
import { IExternalRequest } from './external-request.interface';
import { IRequestResult } from './request-result.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestsHandlerService {

  constructor(
    public http: HttpClient,
  ) { }

  public handle<T>(query: IRequest<T>): Observable<IRequestResult<T>> {
    return query.execute(this).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err);
      }),
    );
  }

  public handleExternal<T>(query: IExternalRequest<T>): Observable<T> {
    return query.execute(this).pipe(
      catchError(err => {
        console.log(err)
        return throwError(() => err);
      }),
    );
  }
}