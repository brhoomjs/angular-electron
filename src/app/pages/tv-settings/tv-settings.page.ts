import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TvService } from '../../tv.service';

@Component({
  selector: 'app-tv-settings',
  templateUrl: './tv-settings.page.html',
  styleUrls: ['./tv-settings.page.scss'],
})
export class TvSettingsPage implements OnInit {
  constructor(public tvService: TvService, private translate: TranslateService) { }

  ngOnInit(): void {
  }
  changeStatus(): void {
    this.tvService.changeLaunched();
  }
  setTimer(event: CustomEvent): void {
    this.tvService.setTimer(parseInt(event.detail.value));
  }
}
