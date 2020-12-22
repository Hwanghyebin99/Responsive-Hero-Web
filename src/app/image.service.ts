import { Injectable } from '@angular/core';

import { img } from './img';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
    imgs:img[] = [
      { name: 'rock', imgURL:'./rock600x400' },
    ];
    
  constructor() { }
}
