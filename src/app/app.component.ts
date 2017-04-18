import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, AlertController, ToastController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen, Network } from 'ionic-native';

//import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('appNav') nav: NavController;
  //@ViewChild(Nav) nav;
  rootPage = LoginPage;

  constructor(public platform: Platform, 
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public appServ: AppService,
              public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      //Splashscreen.hide();
      let disconnectSub = Network.onDisconnect().subscribe(() => {
        this.appServ.isOnline = false;
        let toast = this.toastCtrl.create({
          message: Constants.NETWORK_ERROR,
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
      });

      let connectSub = Network.onConnect().subscribe(()=> {
        this.appServ.isOnline = true;
        events.publish('online');
        //alert(this.appServ.isOnline);
      });

      
      platform.registerBackButtonAction( () => {
        if(this.nav.canGoBack()) {
          this.nav.pop();
          
        }else{
          this.confirmExit();
          /*if(this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
          }else {
            this.confirmExit();
          }*/
        }
      });
    });
  }

  private confirmExit(): void {
    let alert = this.alertCtrl.create({
    title: 'Confirm',
    message: 'Do you want to exit?',
    buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
