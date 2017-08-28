import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { UserAlarmPage } from '../user-alarm/user-alarm';
import { UserConfigurePage } from '../user-configure/user-configure';
import { UserHomePage } from '../user-home/user-home';
import { UserProjectPage } from '../user-project/user-project';
import { UserNewsfeedPage } from '../user-newsfeed/user-newsfeed';
import { UserMypagePage } from '../user-mypage/user-mypage';
import { UserInterviewPage } from '../user-interview/user-interview';

/**
 * Generated class for the UserTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'user-tabs.html',
})
export class UserTabsPage {
  alarmNum: number = 5;
  isInterview: number = 2;

  tab1Root = UserHomePage;
  tab2Root = UserProjectPage;
  tab3Root = UserNewsfeedPage;
  tab4Root = UserInterviewPage;
  tab5Root = UserMypagePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
  }

  ionViewDidEnter() {
    this.statusBar.show();
  }

  openUserAlarmPage() {
    this.navCtrl.push(UserAlarmPage);
  }

  openUserConfigurePage() {
    this.navCtrl.push(UserConfigurePage);
  }
  

}
