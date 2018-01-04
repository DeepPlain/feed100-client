import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { CommonServiceProvider } from '../common-service/common-service';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';

/*
  Generated class for the AdminServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AdminServiceProvider {
  alarmNum = 0;
  interviewNum = 0;

  constructor(
    public http: Http,
    public storage: Storage,
    public commonService: CommonServiceProvider) {
    console.log('Hello AdminServiceProvider Provider');
  }

  registerDeviceToken(uuid, device_token) {
    let url = this.commonService.getServerUrl() + '/admin/api/device-token';
    let data = {
      "uuid" : uuid,
      "device_token" : device_token
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getAdminInfo() {
    let url = this.commonService.getServerUrl() + '/admin/api/admin';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateAccount(avatar_image, nickname, introduction) {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/account';
    let data = {
      "avatar_image" : avatar_image,
      "nickname" : nickname,
      "introduction" : introduction
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getAdminHome() {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/home';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getAlarms() {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/alarms';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getAlarmAndInterviewNum() {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/alarm&interview/num';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterviews() {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/interviews';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }
  
  getProjectInterviews(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/project/' + project_id + '/interviews';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterview(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/admin/interview/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeeds() {
    let url = this.commonService.getServerUrl() + '/admin/api/newsfeeds';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeed(newsfeed_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/' + newsfeed_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateNewsfeedPrivateState(newsfeed_id, value) {
    let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/' + newsfeed_id + '/private';
    let data = {
      "value" : value
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  newsfeedLike(newsfeed_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/like';;
    let data = {
      "newsfeed_id" : newsfeed_id
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
    let url = this.commonService.getServerUrl() + '/admin/api/newsfeed/comment';
    let data = {
      "newsfeed_id" : newsfeed_id,
      "newsfeed_comment_content" : newsfeed_comment_content
    }
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjects() {
    let url = this.commonService.getServerUrl() + '/admin/api/projects';
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProject(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  updateProjectPrivateState(project_id, value) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/private';
    let data = {
      "value" : value
    };
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjectHome(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/home/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getSideMenuData(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/side-menu/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipants(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/participants/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipant(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/participant/' + project_participant_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReports(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/reports/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  selectReport(project_participant_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/report/select/' + project_participant_id;
    let data = {};
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getProjectReport(project_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/report/' + project_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getFeedback(project_id, feedback_id) {
    let url = this.commonService.getServerUrl() + '/admin/api/project/' + project_id + '/feedback/' + feedback_id;
    return Observable.fromPromise(this.commonService.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

}