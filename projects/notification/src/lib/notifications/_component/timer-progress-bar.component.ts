import { Component, Input, AfterViewInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';



@Component({
  selector: 'time-progress-bar',
  template: `<mat-progress-bar *ngIf="duration && duration > 0" mode="determinate" [value]="currentValue"></mat-progress-bar>`
})
export class TimerProgressBarComponent implements AfterViewInit {
  @Input() interval = 100; // interval du timer
  @Input() autostart = true; // démarre automatiquement AfterViewInit
  @Input() reverse = true; // si reverse on part de 100 -> 0
  @Input() duration: number; // en millisecond

  subscription: Subscription;


  leftTime = 0;
  currentValue: number = 0;

  constructor() {}

  ngAfterViewInit() {
    if(this.autostart && this.duration > 0) {
      this.startTimer();
    }
  }


  startTimer() {
    if(this.reverse) {
      this.currentValue = 100;
    } else {
      this.currentValue = 0;
    }
    this.duration -= 1000;
    this.leftTime = this.duration;
    const timer = interval(this.interval);
    this.subscription = timer.subscribe(() => {
      this.leftTime -= this.interval;
      if(this.leftTime <= 0) {
        this.subscription.unsubscribe();
        return;
      }
      this.currentValue = (this.leftTime * 100) / this.duration;
    })


  }

}
