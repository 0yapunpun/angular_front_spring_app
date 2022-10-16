import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private API_SERVICE = 'http://localhost:3312/state/';

  constructor(
    private httpClient:HttpClient
  ) { }

  public getStates (idCountry): Observable<any>{
    return this.httpClient.get(this.API_SERVICE + idCountry)
  }
}
