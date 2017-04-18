import { AppService } from './../../services/app-service';
import { Constants } from './../../utils/constants';
import { LoginService } from './../../providers/login-service';
import { Helper } from './../../utils/helper';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/*
  Generated class for the Forgot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
  providers:[LoginService]
})
export class ForgotPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private loginSrv: LoginService,
              private appServ: AppService) {}

  private email: string;
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ForgotPage');
    this.types = this.appServ.types;
    this.selectedType = Constants.CUSTOMER;
  }

  private types: any;
  private selectedType: number;
  goBack() {
    this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'back'});
  }

  sendPassword() {
    let message: string = '';
      if(this.email === undefined || this.email === '') {
        message = "Please enter your email address.";
        
      }else if(!Helper.validateEmail(this.email)){
        message = "Please enter valid email address.";
      }

      if(message === '') {
        this.loginSrv.getPassword(this.email, this.selectedType)
          .subscribe( 
            (data) => {
              //if(data && data.length > 0 && data[0]['RESULT'] === '1') {
              if(data && data.length > 0) {
                let toast = this.toastCtrl.create({
                  message: 'Login using password emailed to you.',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                this.navCtrl.pop();
              }
            }
            , 
            (err) => {
              let toast = this.toastCtrl.create({
                  message: Constants.ERROR_MESSAGE,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
            }
            );

      }else {
        let toast = this.toastCtrl.create({
              message,
              duration: 3000,
              position: 'bottom',
              cssClass: 'toast-fail'
            });
            toast.present();
      }
  }

  

}
