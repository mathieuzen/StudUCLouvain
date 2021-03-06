/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Jérôme Lemaire and Corentin Lamy
    Date : July 2017
    This file is part of Stud.UCLouvain
    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.

    Stud.UCLouvain is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Stud.UCLouvain is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.
*/

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Market } from '@ionic-native/market';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { Calendar } from '@ionic-native/calendar';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CacheModule } from 'ionic-cache';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SQLite } from '@ionic-native/sqlite';
import { SecureStorage } from '@ionic-native/secure-storage';
import { AppVersion } from '@ionic-native/app-version';
import { Diagnostic } from '@ionic-native/diagnostic';

import { ConnectivityService } from '../providers/utils-services/connectivity-service';
import { FacService } from '../providers/utils-services/fac-service';
import { CourseService } from '../providers/studies-services/course-service';
import { StudiesService } from '../providers/studies-services/studies-service';
import { EventsService } from '../providers/rss-services/events-service';
import { MapService } from '../providers/map-services/map-service'
import { POIService } from '../providers/map-services/poi-service';
import { UserService } from '../providers/utils-services/user-service';
import { RssService } from '../providers/rss-services/rss-service';
import { NewsService } from '../providers/rss-services/news-service';
import { LibrariesService } from '../providers/wso2-services/libraries-service';
import { AdeService } from '../providers/studies-services/ade-service';
import { Wso2Service } from '../providers/wso2-services/wso2-service';
import { StudentService } from '../providers/wso2-services/student-service';
import { SportsService } from '../providers/rss-services/sports-service';
import { RepertoireService } from '../providers/wso2-services/repertoire-service';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    MyApp
  ],
  exports: [
    TranslateModule
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot({ keyPrefix: 'UCL-cache' }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide : ErrorHandler, useClass : IonicErrorHandler},
    AppAvailability,
    ConnectivityService,
    CourseService,
    StudiesService,
    EventsService,
    InAppBrowser,
    MapService,
    Market,
    POIService,
    UserService,
    Device,
    SplashScreen,
    StatusBar,
    GoogleMaps,
    Geolocation,
    Network,
    Calendar,
    NewsService,
    RssService,
    LibrariesService,
    AdeService,
    CourseService,
    Wso2Service,
    NativeGeocoder,
    SportsService,
    RepertoireService,
    StudentService,
    FacService,
    SQLite,
    SecureStorage,
    AppVersion,
    Diagnostic
  ]
})
export class AppModule {}
