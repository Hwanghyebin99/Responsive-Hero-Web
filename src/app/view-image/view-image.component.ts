import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import { img } from '../img';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  img_!:img[];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getImgs();
  }

  getImgs(): void {
      this.heroService.getImgs()
      .subscribe(img_ => this.img_ = img_);
  }
}
