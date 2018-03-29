import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-notification',
  templateUrl: 'company-notification.html',
})
export class CompanyNotificationPage {
  notifications = [
    {
      project_id: 1,
      notification_id: 1,
      // 해당 유저 interview detail로 이동
      notification_link: "newUser",
      notification_image: "./../../assets/img/user-avatar-image-man1.png",
      notification_tag: "유저 참여",
      notification_name: "유저 이름",
      notification_content: "새로운 유저와 매칭이 성사되었습니다! 인터뷰를 진행해주세요!",
      is_read: false,
      notification_registration_date: "2018-01-29 10:00:00",
    },
    {
      project_id: 1,
      notification_id: 1,
      // 해당 유저 interview detail로 이동
      notification_link: "newInterview",
      notification_image: "./../../assets/img/user-avatar-image-man2.png",
      notification_tag: "인터뷰",
      notification_name: "유저 이름",
      notification_content: "인터뷰 답변이 도착했습니다. 확인해주세요!",
      is_read: false,
      notification_registration_date: "2018-01-29 10:00:00",
    },
    {
      project_id: 1,
      notification_id: 2,
      // 종합보고서로 이동
      notification_link: "endProject",
      notification_image: "./../../assets/img/project-main-image2.png",
      notification_tag: "프로젝트 종료",
      notification_name: "프로젝트 제목",
      notification_content: "프로젝트가 종료되었습니다. 종합보고서를 확인해주세요!",
      is_read: false,
      notification_registration_date: "2018-01-29 10:00:00",
    },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyNotificationPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyNotificationPage');
    // let loading = this.commonService.presentLoading();
    
    // this.companyService.getAlarms()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.notifications = data.data;
    //       this.badge.set(0);
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );

  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessAlarmItem(link, project_id, alarm_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    
    this.companyService.alarmRead(alarm_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.notifications = data.data;
          switch(link) {
            case "endProject":
              this.openCompanyProjectReportPage(project_id);
              break;
            case "newUser":
            case "newInterview":
              this.openCompanyProjectInterviewDetailPage(project_id);
              break;
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  back() {
    this.navCtrl.pop();
  }

  accessProjectCard(project_id) {
    this.companyService.accessProjectCard(this, project_id);
  }

  openCompanyProjectInterviewDetailPage(project_id) {
    this.navCtrl.push('CompanyProjectInterviewDetailPage', { "project_id" : project_id });
  }

  openCompanyProjectReportPage(project_id) {
    this.navCtrl.push('CompanyProjectReportPage', { "project_id" : project_id })
  }
}