import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../core/core.module';
import { CoreRoutingModule } from '../core/core-routing.module';
import { FocusDirective } from '../directives/focus.directive';

@NgModule({
  declarations: [SignUpComponent, SignInComponent, FocusDirective],
  exports: [SignUpComponent, SignInComponent, FocusDirective],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CoreModule,
    CoreRoutingModule
  ],
  providers: [AuthService],
})
export class AuthModule {}
