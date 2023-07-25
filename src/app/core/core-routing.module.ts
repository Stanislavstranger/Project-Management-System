import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../auth/components/sign-in/sign-in.component';
import { SignUpComponent } from '../auth/components/sign-up/sign-up.component';
import { ErrorGuard } from '../guards/error.guard';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', canActivate: [ErrorGuard], component: WelcomePageComponent},
  { path: 'signin', canActivate: [ErrorGuard], component: SignInComponent },
  { path: 'signup', canActivate: [ErrorGuard], component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
