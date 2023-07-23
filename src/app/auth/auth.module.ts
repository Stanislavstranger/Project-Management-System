import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  exports: [SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
