import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: "app-tv",
  templateUrl: "./tv.page.html",
  styleUrls: ["./tv.page.scss"],
})
export class TvPage implements OnInit, OnDestroy {
  timer: number;
  winners: number[];
  currentWinners: number[] = [];
  status = 'جاري تجهيز النتائج';
  channel: BroadcastChannel;
  showLoading = true;
  options: AnimationOptions = {
    path: '/assets/uae.json',
  };

  constructor(
    private menuCtrl: MenuController,
    private translate: TranslateService
  ) {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    menuCtrl.enable(false);
  }
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
      path: '/assets/winning.json',
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
      if (i >= this.winners.length) clearInterval(intId);
    }, 750);
  }
  ngOnDestroy(): void {
    this.channel.close();
  }
}
export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}