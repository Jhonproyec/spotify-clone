import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') manejadorError():void{
    const elNative = this.elHost.nativeElement;
    elNative.src = '../../../assets/images/no_imagen.jpg'
  }
  constructor(
    private elHost: ElementRef
  ) { 

  }



}
