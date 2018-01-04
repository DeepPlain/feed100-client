import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectUserReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-user-report',
  templateUrl: 'admin-project-user-report.html',
})
export class AdminProjectUserReportPage {
  project_id;
  // project_report_images
  // project_report_story_summary_content
  // project_report_pros_content
  // project_report_cons_content
  // project_report_overall_opinion_content
  // project_report_registration_date
  // proejct_report_is_select

  userReports = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectUserReportPage');
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.adminService.getProjectReports(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.userReports = data.data;
          for(let i=0; i<this.userReports.length; i++) {
            this.userReports[i].project_report_images = JSON.parse(this.userReports[i].project_report_images);
            for(let j=0; j<this.userReports[i].project_report_images.length; j++) {
              this.userReports[i].project_report_images[j] = {img : this.userReports[i].project_report_images[j]};
            }
          }
          console.log(JSON.stringify(this.userReports));
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
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

  photoView(url) {
    this.photoViewer.show(url);
  }

  bestSelection(project_participant_id, nickname) {
    this.commonService.showConfirmAlert(nickname + '님의 피드백을 선정하시겠습니까?',
      () => {
        let loading = this.commonService.presentLoading();
        
        this.adminService.selectReport(project_participant_id)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
          (data) => {
            if(data.success == true) {
              if(data.data) {
                for(let i=0; i<this.userReports.length; i++) {
                  if(this.userReports[i].project_participant_id == project_participant_id) {
                    this.userReports[i].project_report_is_select = true;
                    this.commonService.showBasicAlert('선정이 완료되었습니다.');
                  }
                }
              }
              else {
                if(data.message == "selected report num is over") {
                  this.commonService.showBasicAlert('선정할 수 있는 피드백 개수를 초과하였습니다.');
                }
              }    
            }
            else if(data.success == false) {
              this.commonService.apiRequestErrorHandler(data, this.navCtrl)
              .then(() => {
                this.bestSelection(project_participant_id, nickname);
              });
            }
          },
          (err) => {
            console.log(err);
            this.commonService.showBasicAlert('오류가 발생했습니다.');
          }
        );
    
      }
    );
  }

  openAdminProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('AdminProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}