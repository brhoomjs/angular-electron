import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvSettingsPage } from './tv-settings.page';

const routes: Routes = [
  {
    path: '',
    component: TvSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvSettingsRoutingModule {}
