import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('intercepting request ' + currentUser);
    if (currentUser && currentUser.authdata) {
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${currentUser.authdata}`
            }
        });
    }

    return next.handle(request);
}
}
