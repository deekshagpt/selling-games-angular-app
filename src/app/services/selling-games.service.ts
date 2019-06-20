import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SellingGamesService {

  constructor(private http: HttpClient) { }
  getSellingGamesData() {
    return this.http.get('./assets/vgsales55c93b8.csv',{responseType: 'text'});
  }
}
