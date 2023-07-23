import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent},
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
