import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IShadow {
  verticalOffset: number,
  horizontalOffset: number,
  blur: number,
  spread: number,
  bgColor: string,
  boxColor: string,
  shadowColor: string,
  shapeRadius: number
}

@Injectable({
  providedIn: 'root'
})
export class ShadowServiceService {

  constructor() { }
  private shadow = new BehaviorSubject<IShadow>({
    bgColor: '#fff',
    boxColor: '#ff00ff',
    shadowColor: '#ff00ff',
    spread: 5,
    blur: 10,
    horizontalOffset: 2,
    verticalOffset: 5,
    shapeRadius: 5
  })
  shadow$ = this.shadow.asObservable()

  updateShadow(shadow: IShadow) {
    this.shadow.next(shadow)
  }
}
