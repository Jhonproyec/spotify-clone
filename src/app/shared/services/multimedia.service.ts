import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
 callback:EventEmitter<any> = new EventEmitter<any>();

  public audio!: HTMLAudioElement;
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00'); 
  public timeRemain$: BehaviorSubject<string> = new BehaviorSubject('-00:00'); 
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);



  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk){
        this.setAudio(responseOk);
      }
    });

    this.listenAllEvents();
  }

  public setAudio(track: TrackModel):void{
    const URL = '../../../../assets/tracks'+track.url;
    this.audio.src = URL;
    this.audio.play();
  }

  private listenAllEvents():void{
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayesStatus, false);
    this.audio.addEventListener('pause', this.setPlayesStatus, false);
    this.audio.addEventListener('play', this.setPlayesStatus, false);
    this.audio.addEventListener('ended', this.setPlayesStatus, false);

  }

  private setPlayesStatus = (state:any) =>{
    switch(state.type) {
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused');
      break
    }
  }

  public toggleButton():void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  private calculateTime = () =>{
    const {duration, currentTime} = this.audio;
    this.setTimeElapse(currentTime);
    this.setTimeRemainin(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }
  
  private setTimeElapse(currentTime: number):void{
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemainin(currentTime: number, duration: number){
    let timeLeft = duration - currentTime;
    
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemain$.next(displayFormat);
  }


  private setPercentage(currentTime: number, duration: number):void{
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  public seeAudio(percentaje: number):void{
    const { duration } = this.audio;
    const porcentageToSeconds = (percentaje * duration) / 100;
    this.audio.currentTime = porcentageToSeconds;
  }

}
