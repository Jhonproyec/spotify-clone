import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  private _state: string = 'paused';
  public get state(): string {
    return this._state;
  }
  public set state(value: string) {
    this._state = value;
  }

  constructor(
    public multiService: MultimediaService
  ){}

  listObservadores: Array<Subscription> = [

  ]
  ngOnInit(): void {
    const observer1$ = this.multiService.playerStatus$
    .subscribe(status => this.state = status);

    this.listObservadores = [observer1$]

    // const observer1$: Subscription = this.multiService.callback.subscribe((response:TrackModel)  => {
    //   this.mockCover = response
    // });

    // this.listObservadores = [observer1$];

    // const observer1$ = this.multiService.myObservable1$.subscribe(
    //   (response) => {
    //     console.log("El agua llega", response);
    //   },
    //   (responseFail) => {
    //     console.log(responseFail);
    //   }
     
    // )
  }

  hendlePosition(event:MouseEvent){
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const clientX = event.clientX;
    const {x, width} = elNative.getBoundingClientRect();
    const clickX = clientX - x;

    const percentageFromx = (clickX * 100) / width;
    this.multiService.seeAudio(percentageFromx);
  }

  ngOnDestroy(): void {
    this.listObservadores.forEach(u => u.unsubscribe())
  }


}
