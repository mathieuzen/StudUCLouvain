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

import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform, AlertController,LoadingController, IonicApp } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Market } from '@ionic-native/market';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../pages/home/home';

import { UserService } from '../providers/utils-services/user-service';
import { Wso2Service } from '../providers/wso2-services/wso2-service';
import { CacheService } from "ionic-cache";

//declare var TestFairy: any;

@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage ='';// = 'HomePage';
  alertPresented: any;
  page: any;
  homePage;
  checked=false;
  campusPages: Array<{title: string, component: any, icon: any,
    iosSchemaName: string, androidPackageName: string,
    appUrl: string, httpUrl: string}>;
  studiePages: Array<{title: string, component: any, icon: any,
    iosSchemaName: string, androidPackageName: string,
    appUrl: string, httpUrl: string}>;
  toolPages: Array<{title: string, component: any, icon: any,
    iosSchemaName: string, androidPackageName: string,
    appUrl: string, httpUrl: string}>;

  constructor(public platform: Platform,
    public menu: MenuController,
    public market: Market,
    private appAvailability : AppAvailability,
    private iab: InAppBrowser,
    private device: Device,
    private splashscreen: SplashScreen,
    private alertCtrl : AlertController,
    private user: UserService,
    private statusBar: StatusBar,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private ionicApp: IonicApp,
    private wso2Service : Wso2Service,
    public cache: CacheService
  ) {
console.log("Startin App");
    this.user.getCampus();
    //this.user.getDisclaimer();
    this.alertPresented = false;
    this.initializeApp();
   
    this.homePage =
      {title: 'MENU.HOME', component: 'HomePage', icon: "./assets/img/home.png",
      iosSchemaName: null, androidPackageName: null,
      appUrl: null, httpUrl: null}
    ;
    this.campusPages =[
      { title: 'MENU.NEWS', component: 'NewsPage', icon: "./assets/img/news.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null },
      { title: 'MENU.EVENTS', component: 'EventsPage', icon: "./assets/img/event.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null  },
      { title: 'MENU.SPORTS', component: 'SportsPage', icon: "./assets/img/sport.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null  },

    ];
    this.studiePages =[
      { title: 'MENU.STUDIES', component: 'StudiesPage', icon: "./assets/img/études.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null  },
      { title: 'MENU.LIBRARY', component: 'LibrariesPage', icon: "./assets/img/biblio.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null  },
      { title: 'MENU.HELP', component: 'SupportPage',
        icon: "./assets/img/support.png", iosSchemaName: null,
        androidPackageName: null, appUrl: null, httpUrl: null }
    ];
    this.toolPages =[
      { title: 'MENU.PARTY', component: 'GuindaillePage', icon: "./assets/img/g2.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null  },
      { title: 'MENU.MAP', component: 'MapPage', icon: "./assets/img/cartes.png",
        iosSchemaName: null, androidPackageName: null,
        appUrl: null, httpUrl: null  },
      { title: 'MENU.RESTAURANT', component: 'RestaurantPage', icon : "./assets/img/resto.png",
        iosSchemaName: 'id1156050719',
        androidPackageName: 'com.apptree.resto4u',
        appUrl: 'apptreeresto4u://',
        httpUrl: 'https://uclouvain.be/fr/decouvrir/resto-u' },
      { title: 'MENU.MOBILITY', component: 'MobilityPage', icon : "./assets/img/mobilité.png",
        iosSchemaName: null,
        androidPackageName: null,
        appUrl: null, httpUrl: null },
      { title: 'MENU.PARAM', component: 'ParamPage', icon : "./assets/img/setting.png",
        iosSchemaName: null,
        androidPackageName: null,
        appUrl: null, httpUrl: null },
      { title: 'MENU.CREDITS', component: 'CreditPage', icon : "./assets/img/signature.png",
        iosSchemaName: null,
        androidPackageName: null,
        appUrl: null, httpUrl: null }
    ];
    platform.ready().then(() => {
    	 this.wso2Service.getToken();
      /*if ((<any>window).TestFairy) {
        TestFairy.begin("b7514d146f2609b445cf858970110d58580938fc");
      }*/
      translateService.setDefaultLang('fr');
      this.user.storage.get('lan').then((data) =>
      {
        if(data!=null) translateService.use(data);
        else translateService.use('fr');
       });
      cache.setDefaultTTL(60 * 60 * 2);
      cache.setOfflineInvalidate(false);
      //this.user.storage.set('first',null);
      this.user.storage.get('first').then((data) =>
      {
      	if(data==null) {
      		this.rootPage = 'TutoPage';
      		this.user.storage.set('first',false);
      	}
      	else this.rootPage = 'HomePage';
      })

    })

    /*this.storage.get('disclaimer').then((disclaimer) => {
      if(!disclaimer) this.disclaimer();
    });*/
    //this.disclaimer();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
    });


    // Confirm exit
    this.platform.registerBackButtonAction(() => {

        let activePortal = this.ionicApp._loadingPortal.getActive() ||
           this.ionicApp._modalPortal.getActive() ||
           this.ionicApp._toastPortal.getActive() ||
            this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
            activePortal.dismiss();
            return
        }
        else if (this.menu.isOpen()) { // Close menu if open
            this.menu.close();
            return
        }
        if (this.nav.length() == 1) {
          this.confirmExitApp();
        } else {
          this.nav.pop();
        }

    });
  }



  confirmExitApp() {
    let activeVC = this.nav.getActive();
    let page = activeVC.instance;
    if(page instanceof HomePage){
      if(!this.alertPresented){
        this.alertPresented = true;
        let confirmAlert = this.alertCtrl.create({
            title: "Fermeture",
            message: "Désirez-vous quitter l'application ?",
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {
                      this.alertPresented = false;
                    }
                },
                {
                    text: 'Quitter',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ]
        });
        confirmAlert.present();
    }
  }
  else this.openRootPage(this.homePage);
}

  disclaimer(){
        //let title:string;
    //let message:string;
    //this.translateService.get('HOME.WARNING').subscribe((res:string) => {title=res;});
    //this.translateService.get('HOME.MESSAGE3').subscribe((res:string) => {message=res;});
     let disclaimerAlert = this.alertCtrl.create({
            title: "Avertissement",
            message: "<p>Version beta de l'application Stud@UCLouvain.</p> <p>Cette version n'est pas publique et est uniquement destinée à une phase de test.</p>",

            buttons: [
                {
                    text: "OK",
                    handler: data => {

                    }
                }
            ]
        });
        disclaimerAlert.present();
  }

  openRootPage(page) {
    let activeVC = this.nav.getActive();
    let test = activeVC.instance;
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.page = page;

    if(!((test instanceof HomePage) && page == this.homePage)){
	    if(page.iosSchemaName != null && page.androidPackageName != null){
	        this.launchExternalApp(page.iosSchemaName, page.androidPackageName, page.appUrl, page.httpUrl);
	    }
	    else {if(page != this.homePage){
       		if(this.nav.length() > 1){
      			this.nav.pop();
      		}
      		
      		this.nav.push(page.component, {title: page.title});
  		}}
    }

  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string) {
	  let app: string;
    	//let storeUrl:string;
    	let check:string;
  	if (this.device.platform === 'iOS') {
  		app = iosSchemaName;
      //storeUrl=httpUrl;
      	check=appUrl;
  	} else if (this.device.platform === 'Android') {
  		app = androidPackageName;
      //storeUrl= 'market://details?id='+ app;
      	check=app;

  	} else {
  		const browser = this.iab.create(httpUrl, '_system');
      browser.close();
  	}
  	this.appAvailability.check(check).then(
  		() => { // success callback
  			const browser = this.iab.create(appUrl, '_system');
        browser.close();
  		},
  		() => { // error callback
  			this.market.open(app);
  		}
  	);
  }

}
