import { AfterContentInit, Component, Input, OnChanges } from "@angular/core";
import Tick from "@pqina/flip";
@Component({
  selector: "app-flipper",
  templateUrl: "./flipper.component.html",
  styleUrls: ["./flipper.component.scss"],
})
export class FlipperComponent implements AfterContentInit, OnChanges {
  @Input() offset: number = 0;
  private counter: any;
  ticker: any;
  value;
  constructor() {}
  ngAfterContentInit() {
    
  }
  ngOnChanges() {
    if (this.counter) {
      this.counter.timer.stop();
    }
    if (!this.ticker) {
      const localization = {
        HOUR_PLURAL: "ساعات",
        HOUR_SINGULAR: "ساعة",
        MINUTE_PLURAL: "دقائق",
        MINUTE_SINGULAR: "دقيقة",
        SECOND_PLURAL: "ثواني",
        SECOND_SINGULAR: "ثانية",
      };
      const el = document.getElementById("myEl");
      const ticker = Tick.DOM.create(el, {});
      this.ticker = ticker;
      for (var key in localization) {
        if (!localization.hasOwnProperty(key)) {
          continue;
        }
        this.ticker.setConstant(key, localization[key]);
      }
    }
    var date = new Date();
    var timeDuration = Tick.helper.duration(this.offset, "minutes");
    var deadline = new Date(
      date.setMilliseconds(date.getMilliseconds() + timeDuration)
    );
    this.counter = Tick.count.down(deadline, { format: ["m", "s"] });
    const tempTicker = this.ticker;
    this.counter.onupdate = function (value) {
      tempTicker.value = value;
    };
  }
}
