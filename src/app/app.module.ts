import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {BallonComponent} from './ballon/ballon.component';
import {RouterModule} from '@angular/router';
import {BallonDemo2Component} from './ballon-demo2/ballon-demo2.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    BallonComponent,
    BallonDemo2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'ballon', component: BallonComponent},
      {path: 'ballon2', component: BallonDemo2Component},
    ])
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
