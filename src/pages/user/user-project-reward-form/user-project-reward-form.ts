import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserProjectRewardFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-reward-form',
  templateUrl: 'user-project-reward-form.html',
})
export class UserProjectRewardFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectRewardFormPage');
  }
  dismiss() {
    // this.statusBar.show();
    // console.log(JSON.stringify(this.appCtrl.getRootNavs()[0].setRoot(LoginPage)));
    // this.viewCtrl.dismiss();;
    // this.viewCtrl.dismiss();
    // console.log(this.navCtrl.popToRoot());
    // this.appCtrl.getRootNavs()[0].setRoot(LoginPage);
    // this.navCtrl.goToRoot;
    // for (let i = 0; i < this.appCtrl.getRootNavs().length; i ++) {

    // }
    // this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
