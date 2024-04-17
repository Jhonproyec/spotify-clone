import { Component, OnDestroy, OnInit } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  observables$: Array<Subscription> = [];
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<any> = [];

  constructor(
    private trackService: TrackService
  ){}
  
  ngOnInit(): void {
    this.loadData();
  }


  loadData():void{
    
    this.tracksTrending = (dataRaw as any).default.data;
    this.tracksRandom = (dataRaw as any).default.data;
    // this.trackService.getAllTracks$().subscribe(response => {
    //   console.log(response)
    //   this.tracksTrending = response;
    // }
  // )

    // this.trackService.getAllTracksRandon$().subscribe(response => {
    //   this.tracksRandom = response;
    // }
    // // error => {
    // //   console.log("Error de conexión canciones random");
    // //   console.log(error.message);
    // // } 
    
    // )
  }


  ngOnDestroy(): void {
    this.observables$.forEach(u => u.unsubscribe());
  }

}
