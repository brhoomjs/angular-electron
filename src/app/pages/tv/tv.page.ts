import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { IonContent, MenuController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: "app-tv",
  templateUrl: "./tv.page.html",
  styleUrls: ["./tv.page.scss"],
})
export class TvPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) ionContent: IonContent;

  timer: number = getInitialTimer(5);
  winners: number[] = [];
  currentWinners: number[] = [];
  status = 'جاري تجهيز القرعة';
  channel: BroadcastChannel;
  showLoading = false;
  type: 2 | 1 = 1;
  options: AnimationOptions = {
    path: '/assets/uae.json',
  };

  constructor(
    private menuCtrl: MenuController,
    private translate: TranslateService
  ) {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.menuCtrl.enable(false);
  }
  didScroll = false;
  ngOnInit(): void {
    
    
    this.channel = new BroadcastChannel("tv-service");
    this.channel.addEventListener("message", (event) => {
      const { data } = event;
      const { type, payloads } = data;
      switch (type) {
        case 0: // Timer;
          this.timer = payloads.time;
          this.currentWinners = [];
          this.showLoading = false;
          break;
        case 2: // Start Draw
          this.winners = payloads.winners;
          this.prepareDraw();
          break;
      }
    });
  }
  
  async prepareDraw(): Promise<void> {
    this.showLoading = true;

    await timeout(3000);
    this.options = {
      ...this.options,
      path: '/assets/particles.json',
    };
    await timeout(3000);
    this.status = "سيتم البدء بعد ";
    await timeout(1000);
    this.status = "10 ثواني";
    await timeout(1000);
    this.status = "9 ثواني";
    await timeout(1000);
    this.status = "8 ثواني";
    await timeout(1000);
    this.status = "7 ثواني";
    await timeout(1000);
    this.status = "6 ثواني";
    await timeout(1000);
    this.status = "5 ثواني";
    await timeout(1000);
    this.status = "4 ثواني";
    await timeout(1000);
    this.status = "3 ثواني";
    await timeout(1000);
    this.status = "2 ثواني";
    await timeout(1000);
    this.status = "1 ثواني";
    await timeout(1000);
    this.showLoading = false;
    let i = 0;
    const intId = setInterval(() => {
      this.currentWinners[i] = this.winners[i];
      i++;
      this.ionContent.scrollToBottom(500);
      if (i >= this.winners.length) {this.startScrolling();clearInterval(intId);}
    }, 100);
  }
  ngOnDestroy(): void {
    this.channel.close();
  }
  async startScrolling(){
      if (this.didScroll) {
        this.ionContent.scrollByPoint(0,500, 2000)
        await timeout(5000)
        this.ionContent.scrollByPoint(0,500, 2000)
        await timeout(5000)
        this.ionContent.scrollByPoint(0,500, 2000)
        await timeout(5000)
        this.ionContent.scrollByPoint(0,500, 2000)
        await timeout(5000)
      } else {
        this.ionContent.scrollToTop(2000);
        await timeout(2000)
      }
      this.didScroll = !this.didScroll;
      await timeout(5000)
      this.startScrolling();
  }
}
export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getInitialTimer(clock: number): number {
  const currentDate = new Date();
  const currentClock = currentDate.getHours();

  const dateForClock =
    currentClock >= clock
      ? new Date().setDate(currentDate.getDate() + 1)
      : new Date();

  const clockDate = new Date(
    new Date(dateForClock).setHours(clock, 0, 0, 0)
  );

  const timeLeft = clockDate.getTime() - currentDate.getTime();
  return timeLeft / 1000 / 60;
}