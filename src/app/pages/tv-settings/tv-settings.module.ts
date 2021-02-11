import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvSettingsRoutingModule } from './tv-settings-routing.module';

import { TvSettingsPage } from './tv-settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { TvService } from '../../tv.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    TvSettingsRoutingModule,
  ],
  providers: [TvService],
  declarations: [TvSettingsPage]
})
export class TvSettingsPageModule {}
