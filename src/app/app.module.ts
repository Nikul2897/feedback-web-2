import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './feedback-common/interceptor.service';
import { LoaderService } from './feedback-common/LoaderService';
import { HttpService } from './feedback-common/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './feedback-common/merterial.module';
import { TostrComponent } from './feedback-common/tostr/tostr.component';
import { LoginComponent } from './feedback-common/login/login.component';

@NgModule({
  declarations: [
    AppComponent, TostrComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    HttpService, LoaderService],
  entryComponents: [TostrComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
