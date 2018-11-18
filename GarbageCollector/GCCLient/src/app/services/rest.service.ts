import { Injectable } from '@angular/core';
import { Http , Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { map, catchError} from 'rxjs/operators';
import { RestListener } from '../models/RestListener';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'http://localhost:8091/';
  constructor(private _http: Http) {
   }


  post(request: any, component: RestListener , url: String, requestType: Number) {

    this._http.post(this.baseUrl + url , request, {headers: this.getHeaders()}).pipe(
     map((response: Response) => <ResponseTemplate> response.json())).subscribe((data) => component.onSuccess(data, request, requestType)
     , (err) => component.onFailure(err, request, requestType));
  }

  get(url: String , component: RestListener, requestType: Number) {
    this._http.get(this.baseUrl + url , {headers: this.getHeaders()}).pipe(
      map((response: Response) => <ResponseTemplate> response.json())).subscribe((data) => component.onSuccess(data, null, requestType)
      , (err) => component.onFailure(err, null, requestType));
  }

  private getHeaders(): Headers {
   const headers: Headers =  new Headers();
   headers.append('Content-Type', 'application/json');
  const currentUser = localStorage.getItem('currentUser');
   if (currentUser) {
    const user: User = JSON.parse(currentUser);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'true');
    headers.append('Authorization', 'Basic ' + user.authdata );
   }

   return headers;
  }
}
