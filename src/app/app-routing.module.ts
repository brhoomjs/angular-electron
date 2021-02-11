import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [

  {
    path: 'draw',
    loadChildren: () => import('./pages/draw/draw.module').then( m => m.DrawPageModule)
  },
  {
    path: '',
    redirectTo: 'draw',
    pathMatch: 'full'
  },
  {
    path: 'tv',
    loadChildren: () => import('./pages/tv/tv.module').then( m => m.TvPageModule)
  },
  {
    path: 'tvsettings',
    loadChildren: () => import('./pages/tv-settings/tv-settings.module').then( m => m.TvSettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules , useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


