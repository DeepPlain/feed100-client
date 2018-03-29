import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectStoryHorizontalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-story-horizontal',
  templateUrl: 'company-project-story-horizontal.html',
})
export class CompanyProjectStoryHorizontalPage {
  @ViewChild(Slides) slides: Slides;

  project_id;

  isFirstSlide: boolean = true;
  // 프로젝트에 테스트할 링크가 있는지
  isLink: boolean = true;

  projectMainImage: string = "./../../assets/img/feed100-intro-slide4.png";
  nickname: string = "포텐브라더스";
  projectName: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  projectViewNum: number = 0;
  participantNum: number = 0;
  maxParticipantNum: number = 0;
  maxReward: number = 5500;
  progressState: string = "";
  projectSummary: string = "";
  projectRegistrationDate: string = "";
  project_link;
  // 프로젝트 테스트
  testInfo: string="asdasdas";

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  projectStorySlides = [
    {
      storyImage: "",
      storyVideo: "",
      storyContent: ""
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public platform: Platform,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectStoryHorizontalPage');
    // this.commonService.isLoadingActive = true;
    // this.project_id = this.navParams.get('project_id');
    this.slides.lockSwipeToPrev(true);  
  }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter CompanyProjectStoryHorizontalPage');
    // let loading = this.commonService.presentLoading();

    // this.companyService.getProject(this.project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       if(this.platform.is('android')) {
    //         this.isLink = (data.data.project_android_link) ? true : false;
    //         this.project_link = data.data.project_android_link;
    //       }
    //       else if(this.platform.is('ios')) {
    //         this.isLink = (data.data.project_ios_link) ? true : false;
    //         this.project_link = data.data.project_ios_link;
    //       }
    //       this.projectMainImage = data.data.project_main_image;
    //       this.nickname = data.data.nickname;
    //       this.projectName = data.data.project_name;
    //       this.projectViewNum = data.data.project_view_num;
    //       this.participantNum = data.data.participant_num;
    //       this.maxParticipantNum = data.data.max_participant_num;
    //       this.progressState = data.data.project_end_date;
    //       this.projectSummary = data.data.project_summary;
    //       this.projectRegistrationDate = data.data.project_registration_date;
    //       this.projectStorySlides = JSON.parse(data.data.project_story);

          this.totalPageNum = this.projectStorySlides.length + 1;
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // )    
  }

  back() {
    this.navCtrl.pop();
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.slides.lockSwipeToPrev(true);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '16px'; // 추가
      this.isFirstSlide = true;
    } else {
      this.slides.lockSwipeToPrev(false);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '0'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionProperty = 'margin-left'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionDuration = '0.4s'; // 추가
      this.isFirstSlide = false;
    }

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    };

    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  goFirstSlide() {
    let differencePageNum = this.currentPageNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.slides.slidePrev(200);
    }
  }

  openCompanyProjectLinkPage() {
    cordova.ThemeableBrowser.open(this.project_link, '_system');
  }

}