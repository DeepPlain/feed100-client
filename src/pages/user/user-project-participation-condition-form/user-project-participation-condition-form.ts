import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController, App, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectParticipationConditionFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-participation-condition-form',
  templateUrl: 'user-project-participation-condition-form.html',
})
export class UserProjectParticipationConditionFormPage {
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild(Slides) slides: Slides;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  // 프로젝트 안내 동의 체크
  // isCheck: boolean = false;
  isCheck;
  // 프로젝트 안내 문구
  // project_notice: string = "asd";
  project_notice;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  project_id;

  // projectName: String = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  // projectMainImage: String = "./../../assets/img/feed100-intro-slide4.png";

  // participationConditionSlides = [{"isMultiCheck": true,"question" : "","options" : [{"option" : "a"},{"option" : "d"},{"option" : "c"},{"option" : "b"},{"option" : "e"}], "value" : ""}];
  projectName;
  projectMainImage;
  participationConditionSlides = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectParticipationConditionFormPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectParticipationConditionFormPage');
    let loading = this.commonService.presentLoading();

    this.userService.getProject(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.project_notice = data.data.project_notice;
          this.projectName = data.data.project_name;
          this.projectMainImage = data.data.project_main_image;
          this.participationConditionSlides = JSON.parse(data.data.project_participation_objective_conditions);          
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )

  }

  back() {
    this.navCtrl.pop();
  }

  goNextSlide() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(300);
    this.slides.lockSwipeToNext(true);
  }

  ionRadioChange(i) {
    // if(!this.participationConditionSlides[i].value) {
    //   this.slides.lockSwipeToNext(true);
    // } else {
    //   this.slides.lockSwipeToNext(false);
    // }
  }

  slideChanged() {
    // let index = this.slides.getActiveIndex();
    // if(this.participationConditionSlides[index] && !this.participationConditionSlides[index].value) {
    //   this.slides.lockSwipeToNext(true);
    // } else {
    //   this.slides.lockSwipeToNext(false);
    // }
  }

  openUserProjectStoryPage() {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
  
    this.userService.checkProcessCondition(this.project_id, this.participationConditionSlides)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data) {
            this.navCtrl.pop({animate: false});
            this.navCtrl.push('UserProjectStoryHorizontalPage', { "project_id" : this.project_id, "isFeedback" : true });
            this.commonService.showBasicAlert('축하합니다! 조건이 충족되어 프로젝트에 참여하실 수 있습니다. 스토리를 자세히 보시고 인터뷰에 응답해주세요!');
          }
          else {
            if(data.message == 'project is not proceeding') {
              this.back();
              this.commonService.showBasicAlert('이런! 프로젝트가 이미 종료되었습니다.');
            }
            else if(data.message == 'project is exceeded') {
              this.back();
              this.commonService.showBasicAlert('이런! 인원이 초과되었습니다.');
            }
            else {
              this.commonService.showBasicAlert('이런! 아쉽게도 프로젝트 조건을 충족하지 못했습니다. 다른 프로젝트에 참여해주세요.');
              this.back();
            }
          }
        }
        else if(data.success == false) {
          this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )
  }

  check() {
    if(this.isCheck) {
      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }

}
