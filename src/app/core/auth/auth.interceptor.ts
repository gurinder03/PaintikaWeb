/* eslint-disable @typescript-eslint/member-ordering */
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthencationService } from './authencation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        public auth: AuthencationService,
    ) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            console.log('401 err');
            this.auth.logout();
            this.router.navigate(['auth/login']);
            return of(err.message);
        }
        return throwError(err);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return from(Promise.resolve(localStorage.getItem('token'))).pipe(
            switchMap((token) => {
                console.log('token => ', token);
                // eslint-disable-next-line max-len
                const headers = req.headers.set('Authorization', `${token}`);
                const requestClone = req.clone({ headers });
                return next
                    .handle(requestClone)
                    .pipe(catchError((err) => this.handleAuthError(err)));
            })
        );
    }
}
