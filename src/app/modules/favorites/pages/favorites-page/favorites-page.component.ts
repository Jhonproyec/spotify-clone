import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import * as dataRaw from '../../../../data/tracks.json';


@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {


  tracks: Array<TrackModel> = [];

  constructor(){}
  ngOnInit(): void {
    this.tracks = (dataRaw as any).default.data;
  }
  
}
