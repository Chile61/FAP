import { MessagePage } from './../components/message-page/message-page';
import { ConfirmuserdetailsPage } from './../pages/confirmuserdetails/confirmuserdetails';
import { Search } from './../components/search/search';
import { AddInsurance } from './../components/add-insurance/add-insurance';
import { AddAddress } from './../components/add-address/add-address';
import { ZoomImage } from './../components/zoom-image/zoom-image';
import { PrescriptionEntry } from './../components/prescription-entry/prescription-entry';
import { TakePicture } from './../components/take-picture/take-picture';
import { TimeRange } from './../components/time-range/time-range';
import { PrescriptionPage } from './../pages/prescription/prescription';
import { PharmapagePage } from './../pages/pharmapage/pharmapage';
import { CustomerpagePage } from './../pages/customerpage/customerpage';
import { CustomerprofilePage } from './../pages/customerprofile/customerprofile';
import { PharmacyprofilePage } from './../pages/pharmacyprofile/pharmacyprofile';
import { PharmacydetailsPage } from './../pages/pharmacydetails/pharmacydetails';
import { PharmacieslistPage } from './../pages/pharmacieslist/pharmacieslist';
import { VerifyuserPage } from './../pages/verifyuser/verifyuser';
import { AppService } from './../services/app-service';
import { ForgotPage } from './../pages/forgot/forgot';
import { CustomersignupPage } from './../pages/customersignup/customersignup';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

const COMPONENTS = [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    CustomersignupPage,
    ForgotPage,
    VerifyuserPage,
    PharmacieslistPage,
    PharmacydetailsPage,
    PharmacyprofilePage,
    CustomerprofilePage,
    CustomerpagePage,
    PharmapagePage,
    PrescriptionPage,
    TimeRange,
    TakePicture,
    PrescriptionEntry,
    AddAddress,
    AddInsurance,
    Search,
    ConfirmuserdetailsPage,
    MessagePage
  ];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: COMPONENTS,
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AppService
  ]
})
export class AppModule {}
