import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawPageRoutingModule } from './draw-routing.module';

import { DrawPage } from './draw.page';
import { TvService } from '../../tv.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DrawPageRoutingModule
  ],
  providers: [TvService],
  declarations: [DrawPage]
})
export class DrawPageModule {}
