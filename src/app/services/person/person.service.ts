import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private API_SERVICE = 'http://localhost:3312/persons/';

  constructor(
    private httpClient:HttpClient
  ) { }

  public getAllPersons (): Observable<any>{
    return this.httpClient.get(this.API_SERVICE)
  }

  public savePerson (person:any): Observable<any>{
    return this.httpClient.post(this.API_SERVICE, person)
  }

  public deletePerson (id): Observable<any>{
    return this.httpClient.delete(this.API_SERVICE + "delete/" + id)
  }
}



