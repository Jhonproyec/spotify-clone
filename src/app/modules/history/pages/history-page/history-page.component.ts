import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../../data/tracks.json';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
  listResultado$: Array<any> = [];
  constructor(
    private searchService: SearchService
  ){}

    receiveData($event:string){
      // this.listResultado$ = this.searchService.searchTracks$($event)
      this.listResultado$ = (dataRaw as any).default.data;
    }
}
