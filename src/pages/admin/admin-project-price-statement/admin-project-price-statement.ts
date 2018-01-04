import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectPriceStatementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-price-statement',
  templateUrl: 'admin-project-price-statement.html',
})
export class AdminProjectPriceStatementPage {
  project_id;

  projectMainImage:String = "";
  projectPaymentDate: String = "";
  projectRegistrationDate: String = ""
  projectEndDate: String = ""
  type: String = "";
  projectName: String = "";
  isSale:boolean = false;
  typePrice:number = 0;
  salePrice:number = 0;
  participantNum:number = 0;
  feedbackNum:number = 0;
  opinionNum:number = 0;
  interviewNum:number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectPriceStatementPage');
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.adminService.getSideMenuData(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectMainImage = data.data.project_main_image;
          this.projectPaymentDate = data.data.project_payment_date;
          this.projectRegistrationDate = data.data.project_registration_date;
          this.projectEndDate = data.data.project_end_date;
          this.type = data.data.project_type;
          this.projectName = data.data.project_name;
          this.typePrice = data.data.project_price;
          this.participantNum = data.data.max_participant_num;
          this.feedbackNum = this.participantNum;
          this.opinionNum = this.participantNum * (this.participantNum - 1);
          this.interviewNum = this.participantNum * 2;
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
}
