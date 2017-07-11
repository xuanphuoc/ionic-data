import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MediaPlugin } from '@ionic-native/media';

import { SearchPage } from '../pages/search/search';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserPage } from '../pages/user/user';

import { UserInfo } from '../pages/userinfo/userinfo';

import { Play } from '../pages/play/play';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    
    SearchPage,
    SettingPage,
    HomePage,
    UserPage,

    UserInfo,
    Play
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,

    SearchPage,
    SettingPage,
    HomePage,
    UserPage,

    UserInfo,
    Play
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    MediaPlugin,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
