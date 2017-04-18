import { PharmapagePage } from './../pharmapage/pharmapage';
import { Constants } from './../../utils/constants';
import { AppService } from './../../services/app-service';
import { CustomerpagePage } from './../customerpage/customerpage';
import { CustomerprofilePage } from './../customerprofile/customerprofile';
import { LoginPage } from './../login/login';
import { PharmacyprofilePage } from './../pharmacyprofile/pharmacyprofile';
import { ViewChild, Component } from '@angular/core';

import { Nav, NavController, Platform, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  //rootPage: any = PharmacyprofilePage;
  //rootPage: any = CustomerprofilePage;
  rootPage: any;

  pages: Array<{pageId: string, title: string, icon: string}>;
  private firstName: string;
  private lastName: string;
  private email: string;
  constructor(public navCtrl: NavController, 
              public platform: Platform, 
              public menu: MenuController,
              public appServ:AppService) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      //Splashscreen.hide();
      this.firstName = this.appServ.loginUserDetails['firstName'];
      this.lastName = this.appServ.loginUserDetails['lastName'];
      this.email = this.appServ.loginUserDetails['email'];
      if(this.appServ.loginUserDetails['type'] === Constants.PHARMACY){
        this.rootPage = PharmapagePage;
        this.pages = Constants.PHARMA_MENU;

      }else{
        this.rootPage = CustomerpagePage;
        this.pages = Constants.CUSTOMER_MENU;
      }
    });
  }

  openPage(page) {
    //alert(page.component);
    if(this.menu.isOpen()) {
      this.menu.close();
    }

    if(page.pageId === 'so'){
      this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'back'});
      
    } else if(page.pageId === 'phm') {
        this.nav.setRoot(PharmapagePage, {}, {animate: true, direction: 'forward'});
    } else if(page.pageId === 'chm') {
        this.nav.setRoot(CustomerpagePage, {}, {animate: true, direction: 'forward'});
    } else if(page.pageId === 'pp') {
        this.nav.setRoot(PharmacyprofilePage, {}, {animate: true, direction: 'forward'});
    } else if(page.pageId === 'cp') {
        this.nav.push(CustomerprofilePage, {currentState: Constants.MY_INFO}, {animate: true, direction: 'forward'});
    }
  }

}
