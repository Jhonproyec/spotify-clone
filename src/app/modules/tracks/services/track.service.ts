import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';
import * as dataRaw from '../../../data/tracks.json';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = enviroment.api;
  constructor(
    private http: HttpClient
  ) {}



  getAllTracks$():Observable<any>{
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}: any) => {
        return data;
      })
    )
  }

  getAllTracksRandon$():Observable<any>{
    return this.http.get(`${this.URL}/tracks`)
    .pipe(  
      map(({data}: any) => {
        return data.reverse();
      }),
      catchError((err) => {
        const {status, statusText} = err
        // console.log('---> algo pasó, hay que revisar');
        console.table([status, statusText]);
        return of([]);
      })
    )
  }

}
