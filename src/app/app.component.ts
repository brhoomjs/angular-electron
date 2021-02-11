import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
// import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    const loadedLang = localStorage.getItem('lang') || 'en';
    translate.use(loadedLang);
    this.checkDir(loadedLang);
    this.translate.setDefaultLang('en');
    // console.log('AppConfig', AppConfig);

    // if (electronService.isElectron) {
    //   console.log(process.env);
    //   console.log('Run in electron');
    //   console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
    //   console.log('Electron Remote', this.electronService.remote);
      
    //   console.log('NodeJS childProcess', this.electronService.childProcess);
    // } else {
    //   console.log('Run in browser');
    // }
  }

  checkDir(lang: string): void {
    if (lang !== 'ar' && document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
      document.getElementsByTagName('html')[0].classList.remove('ar')
    } else if (lang === 'ar' && !document.getElementsByTagName('html')[0].hasAttribute('dir')) {
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
      document.getElementsByTagName('html')[0].classList.add('ar')
    }
  }

  changeLang(): void {
    const lang = this.translate.currentLang === "en" ? "ar" : "en";
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.checkDir(lang);
  }
}
