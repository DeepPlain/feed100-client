import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProjectHomePage } from './company-project-home';
import { PipesModule } from '../../../pipes/pipes.module';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../../assets/components/components.module';
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

@NgModule({
  declarations: [
    CompanyProjectHomePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    MomentModule,
    ChartsModule,
    IonicPageModule.forChild(CompanyProjectHomePage),
  ],
})
export class CompanyProjectHomePageModule {}
