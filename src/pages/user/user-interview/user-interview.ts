import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-interview',
  templateUrl: 'user-interview.html',
})
export class UserInterviewPage {
  activeAccordion: boolean = false;

  interviews = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,    
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
      
  }
  
  ionViewWillUnload() {
    console.log('ionViewWillUnload UserInterviewPage');
    this.userService.userInterviewPage = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInterviewPage');
    this.userService.userInterviewPage = this;

    let loading = this.commonService.presentLoading();

    this.userService.getInterviews()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.interviews = data.data;
          this.getAlarmAndInterviewNum();
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  getAlarmAndInterviewNum() {
    this.userService.getAlarmAndInterviewNum()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.userService.alarmNum = data.data.alarm_num;
          this.userService.interviewNum = data.data.interview_num;
          this.badge.set(data.data.alarm_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    refresher.complete();
  }

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }

  openUserProjectInterviewDetailPage(project_id, progressState) {
    if(progressState == '종료') {
      this.commonService.showBasicAlert('이미 종료된 프로젝트입니다.');
    }
    else {
      this.navCtrl.push('UserProjectInterviewDetailPage', { "project_id" : project_id });
    }
  }

  // 추가된 함수

  getAlarmNum() {
    return this.userService.alarmNum;
  }

  openUserAlarmPage() {
    this.navCtrl.push('UserAlarmPage');
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

  // 추가된 함수 끝
}
