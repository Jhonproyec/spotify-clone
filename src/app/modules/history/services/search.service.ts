import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import * as dataRaw from '../../../data/tracks.json';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = enviroment.api;
  
  constructor(
    private http: HttpClient
  ) { }


  searchTracks$(term: string): Observable<any> {
    return this.http.get(`${this.URL}/tracks?src=${term}`)
    .pipe( 
      map((dataRaw : any) => dataRaw.data)
    )
    // return (dataRaw as any).default.data
  }




}
