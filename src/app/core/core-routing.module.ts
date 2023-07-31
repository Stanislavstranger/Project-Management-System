import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';
import { AuthGuard } from '../guards/auth.guard';
import { ErrorGuard } from '../guards/error.guard';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', canActivate: [ErrorGuard], component: WelcomePageComponent },
  { path: 'signin', canActivate: [ErrorGuard], component: SignInComponent },
  { path: 'signup', canActivate: [ErrorGuard], component: SignUpComponent },
  {
    path: 'edit-profile',
    canActivate: [ErrorGuard, AuthGuard],
    component: EditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
