import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CompanyProjectInterviewPage } from '../company-project-interview/company-project-interview';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-interview',
  templateUrl: 'company-interview.html',
})
export class CompanyInterviewPage {
  activeAccordion: boolean = false;

  projectInterviews = [
    {
      project_participant_id:1,
      project_main_image: 'assets/img/project-main-image3.png',
      project_name: '프로잭트 이름',
      total_company_interview_num: 10,
      max_company_interview_num: 60,
      project_end_date: '2017-09-20 00:00:00',
      interview_response: false,
    },
    {
      project_participant_id:2,
      project_main_image: 'assets/img/project-main-image2.png',
      project_name: '프로잭트 이름',
      total_company_interview_num: 2,
      max_company_interview_num: 60,
      project_end_date: '2017-09-18 00:00:00',
      interview_response: false,
    },
    {
      project_participant_id:3,
      project_main_image: 'assets/img/project-main-image1.png',
      project_name: '프로잭트 이름',
      total_company_interview_num: 30,
      max_company_interview_num: 60,
      project_end_date: '2017-09-13 00:00:00',
      interview_response: true,
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidEnter() {
    // let loading = this.httpService.presentLoading();
    
    // this.httpService.getInterviews()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.projectInterviews = data.data;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInterviewPage');
  }

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }
  
  openCompanyProjectInterviewPage(project_participant_id, progressState) {
    if(progressState == '종료') {
      this.commonService.showBasicAlert('이미 종료된 프로젝트입니다.');
    }
    else {
      this.appCtrl.getRootNavs()[0].push(CompanyProjectInterviewPage, { "project_participant_id" : project_participant_id});
    }
  }

}
