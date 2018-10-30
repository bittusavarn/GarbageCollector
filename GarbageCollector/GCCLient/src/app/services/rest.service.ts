import { Injectable } from '@angular/core';
import { Http , Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { map, catchError} from 'rxjs/operators';
import { RestListener } from '../models/RestListener';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'http://localhost:8091/';
  private headers: Headers = new Headers({});
  constructor(private _http: Http) {
    this.headers.append('Content-Type', 'application/json');
   }


  post(request: any, component: RestListener , url: String, requestType: Number): Observable<ResponseTemplate> {
    return  this._http.post(this.baseUrl + url , request, {headers: this.headers}).pipe(
     map((response: Response) => <ResponseTemplate> response.json())).subscribe((data) => component.onSuccess(data, request, requestType)
     , (err) => component.onFailure(err, request, requestType));
  }

  get(url: String , component: RestListener, requestType: Number): Observable<ResponseTemplate> {
    return  this._http.get(this.baseUrl + url , {headers: this.headers}).pipe(
      map((response: Response) => <ResponseTemplate> response.json())).subscribe((data) => component.onSuccess(data, null, requestType)
      , (err) => component.onFailure(err, null, requestType));
  }
}
