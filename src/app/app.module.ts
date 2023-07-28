import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { BoardsModule } from './boards/boards.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NotFoundPageComponent,
    GlobalErrorComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    MatIconModule,
    MatButtonModule,
    BoardsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
