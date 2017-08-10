/*
    Copyright 2017 Lamy Corentin, Lemaire Jerome

    This file is part of UCLCampus.

    UCLCampus is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    UCLCampus is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with UCLCampus.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Component, trigger, state, style, animate, transition } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibrariesService } from '../../providers/libraries-service';
import { LibraryItem } from '../../app/entity/libraryItem';
import { ConnectivityService } from '../../providers/connectivity-service';

/**
 * Generated class for the LibraryDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-library-details',
  templateUrl: 'library-details.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class LibraryDetailsPage {
  libDetails: LibraryItem;
  shownGroup = null;
  searching: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public libService: LibrariesService, public connService: ConnectivityService) {
    this.libDetails = navParams.get('lib');
    this.searching = true;
    if(this.connService.isOnline()) {
      this.libService.loadLibDetails(this.libDetails).then(
        res => {
          let result:any = res;
          this.libDetails = result.libDetails;
          this.searching = false;
        }
      );
    } else {
      this.searching = false;
      this.connService.presentConnectionAlert();
    }
  }

  toggleGroup(group) {
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
  }

  isGroupShown(group) {
      return this.shownGroup === group;
  }


  ionViewDidLoad() {
  }

}
