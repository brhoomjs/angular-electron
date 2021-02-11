import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TvService } from '../../tv.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements OnInit, OnDestroy {
  counter = [ ...Array(200).keys() ].map( i => i+1);
  constructor(public tvService: TvService) { }
  lanuched = true;
  subscribtion: Subscription;
  
  c: number;
  p: number;

  ngOnInit() {
    this.subscribtion = this.tvService.lanuched.subscribe(v => {
      this.lanuched = v;
      console.log(v);
      
    })
  }
  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
  run(): void {
    if (this.c && this.p) {
      this.tvService.startDraw(this.c,this.p);
    } else { 
      window.alert("Please Select True Value")
    }
  }
}
