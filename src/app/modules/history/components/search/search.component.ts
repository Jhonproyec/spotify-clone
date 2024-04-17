import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() callbackData:EventEmitter<any> = new EventEmitter();

  src: string = "";

  callSearch(evento: any){

    if(evento.length >= 3){
      this.callbackData.emit(evento);
    }
  }

  

}
