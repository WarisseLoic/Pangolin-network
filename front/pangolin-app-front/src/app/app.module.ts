import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { HomepageBackgroundComponent } from './homepage-background/homepage-background.component';
import { HomepageNavigationbarComponent } from './homepage-navigationbar/homepage-navigationbar.component';
import { ModalConnexionComponent } from './modal-connexion/modal-connexion.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    HomepageBackgroundComponent,
    HomepageNavigationbarComponent,
    ModalConnexionComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
