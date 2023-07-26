import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CoreRoutingModule } from './core-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, EditProfileComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    CoreRoutingModule,
    MatIconModule,
  ],
})
export class CoreModule {}
