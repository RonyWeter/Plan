import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  _url: String = 'https://unionautosleasing.com';

  constructor(private http: HttpClient) { }

  public getPlanData(): Observable<any> {
    return this.http.get<any>(this._url + '/api/getPlanData');
  }

  public updateUser(planData : {planData : string}): Observable<any> {
    return this.http.post<any>(this._url + '/api/updatePlan', planData);
  }

  // public updateUser(planData: string): Observable<any> {
  //   const body = { planData }; 
  //   return this.http.post<any>(`${this._url}/api/updatePlan`, body);
  // }
  
}
