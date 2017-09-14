import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProjectSideMenuPage } from './user-project-side-menu';

import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserProjectSideMenuPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(UserProjectSideMenuPage),
  ],
})
export class UserProjectSideMenuPageModule {}
