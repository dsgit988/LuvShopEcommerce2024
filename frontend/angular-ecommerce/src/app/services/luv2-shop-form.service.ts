import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from 'src/app/common/state';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  // private countriesUrl = "http://localhost:8080/api/countries";
  // private statesUrl = "http://localhost:8080/api/states";
  private countriesUrl = environment.luv2shopApiUrl + "/countries";
  private statesUrl = environment.luv2shopApiUrl + "/states";

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{
    //search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GeResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
  
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number [] = [];

    //build an array for Month dropdown list
    //start at current month and loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    //build an array for Year dropdown list
    //start at current year and loop for next 10 year
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }
    return of(data);

  }


}

interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}

interface GeResponseStates{
  _embedded: {
    states: State[];
  }
}
