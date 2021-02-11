import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvPageRoutingModule } from './tv-routing.module';
import { FlipperModule } from "../../flipper/flipper.module";

import { TvPage } from './tv.page';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from "ngx-lottie";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlipperModule,
    LottieModule,
    TranslateModule.forChild(),
    TvPageRoutingModule
  ],
  declarations: [TvPage]
})
export class TvPageModule {}
