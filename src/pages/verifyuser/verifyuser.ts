import { Constants } from './../../utils/constants';
import { AppService } from './../../services/app-service';
import { SignUpService } from './../../providers/signup-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/*
  Generated class for the Verifyuser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verifyuser',
  templateUrl: 'verifyuser.html',
  providers:[SignUpService]
})
export class VerifyuserPage {

  private otpValue: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public signUpServ: SignUpService,
              public appServ: AppService) {}

  hideVerified: boolean = true; 
  hideVerifiedLogin: boolean = false;
  verifyMsg: string;            
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyuserPage');
    //alert(`${this.navParams.get('email')}
      //    ${this.navParams.get('otp')}`);
  }

  verifyUser() {
    if(this.otpValue === undefined || String(this.otpValue) === '') {
      let message: string = '';
      message = "Please enter valid code sent to your email.";
      let toast = this.toastCtrl.create({
              message,
              duration: 3000,
              position: 'bottom',
              cssClass: 'toast-fail'
            });

            toast.onDidDismiss(() => {
              //console.log('Dismissed toast');
            });

            toast.present();
    }else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      let email: string = this.navParams.get('email');
      //let otp: number = this.navParams.get('otp');
      this.signUpServ.verifyUser(email, this.appServ.signUpType, this.otpValue).subscribe(
      data => {
        //alert(JSON.stringify(data));
        loading.dismiss();
        if(data && data.length > 0) {
          if(data[0]['RESULT'] === '1') {
            this.hideVerified = false;
            if(this.appServ.signUpType === Constants.CUSTOMER) {
              this.verifyMsg = 'Your email verification was successful.';
              this.hideVerifiedLogin = false;

            }else if(this.appServ.signUpType === Constants.PHARMACY) {
              this.verifyMsg = 'Your email verification was successful. We are processing your account. We will notify you once your account is processed.';
              this.hideVerifiedLogin = true;
            }

          }else {
            let toast = this.toastCtrl.create({
                  message: 'Verification code do not match.',
                  duration: 3000,
                  position: 'bottom',
                  cssClass: 'toast-fail'
                });
            toast.present();
          }
        }else {
            //loading.dismiss();
            let toast = this.toastCtrl.create({
              message: Constants.ERROR_MESSAGE,
              duration: 3000,
              position: 'bottom',
              cssClass: 'toast-fail'
            });
            toast.present();
        }
      },
      err => {console.log(err);loading.dismiss();}
    );
    }
    
  }

  showLogin() {
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
       
  }

}
