import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { CompanyProjectHomePage } from '../company-project-home/company-project-home';
import { CompanyProjectStoryPage } from '../company-project-story/company-project-story';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project',
  templateUrl: 'company-project.html',
})
export class CompanyProjectPage {

  projects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectPage');
    let loading = this.commonService.presentLoading();

    this.companyService.getProjects()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projects = data.data;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.commonService.showBasicAlert('오류가 발생했습니다.')
      }
    );

  }

  // 내 프로젝트 or not
  accessProjectCard(project_id) {
    let loading = this.commonService.presentLoading();

    this.companyService.getIsMyProject(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.is_my_project) {
            this.openCompanyProjectHomePage(project_id);
          }
          else {
            this.openCompanyProjectStoryPage(project_id);
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.accessProjectCard(project_id);
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  openCompanyProjectHomePage(project_id) {
    let userProjectHomeModal = this.modalCtrl.create(CompanyProjectHomePage, { "project_id" : project_id });
    userProjectHomeModal.present();
  }

  openCompanyProjectStoryPage(project_id) {
    this.appCtrl.getRootNavs()[0].push(CompanyProjectStoryPage, { "project_id" : project_id });
  }
}
