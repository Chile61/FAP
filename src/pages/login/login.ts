import { CustomerprofilePage } from './../customerprofile/customerprofile';
import { Helper } from './../../utils/helper';
import { CustomerType } from './../../interfaces/customer-type';
import { LoginService } from './../../providers/login-service';
import { AppService } from './../../services/app-service';
import { Constants } from './../../utils/constants';
import { HomePage } from './../home/home';
import { PharmacyprofilePage } from './../pharmacyprofile/pharmacyprofile';
import { PharmacieslistPage } from './../pharmacieslist/pharmacieslist';
import { ForgotPage } from './../forgot/forgot';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loginServ:LoginService,
              public appServ:AppService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public events: Events) {}
              

  private title: string;
  private email: string;
  private password: string;
  private types;
  private selectedType: number;
  //private types = [{"CustomerTypeID":"1","CustomerType":"Pharmacy"},{"CustomerTypeID":"2","CustomerType":"Customer\/Patient"},{"CustomerTypeID":"3","CustomerType":"Admin"}];
  private isOnline: boolean;
  
  ionViewDidLoad() {
    
    this.isOnline = this.appServ.isOnline;
    //alert(this.isOnline);
    if(this.isOnline) {
        this.showLogin();
        

      } else {
        this.title = "Offline";
        this.events.subscribe('online', () => {
          this.isOnline = this.appServ.isOnline;
          this.events.unsubscribe('online');
          this.showLogin();
        });
      }

  }

  showLogin() {
    this.title = "Sign In";
    this.selectedType = Constants.CUSTOMER;
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      this.loginServ.getCustomerTypes()
              .subscribe(
                  data =>  { 
                    this.appServ.types = this.types = data;
                    loading.dismiss();
                  },
                  error => {
                    //console.log(JSON.stringify(error));
                    loading.dismiss();
                    let toast = this.toastCtrl.create({
                      message: Constants.ERROR_MESSAGE,
                      duration: 3000,
                      position: 'bottom',
                      cssClass: 'toast-fail'
                    });
                    //toast.onDidDismiss(()=>{this.showLogin()});
                    toast.present();
                  }, // in case of failure show this message
                  () => {}
              );
  }

  validate() {
      let message: string = '';
      if(this.email === undefined || this.email === '') {
        message = "Please enter your email address.";
        
      }else if(!Helper.validateEmail(this.email)){
        message = "Please enter valid email address.";
        
      }else if(this.password === undefined || this.password === null) {
        message = "Please enter your password.";
      
      }else if(this.password.length < Constants.PASSWORD_LENGTH) {
        message = "Password must be atleast 8 characters long.";
      }

      if(message === '') {
        this.login();

      }else {
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
      }
    
  }

  login() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.loginServ.loginAttempt(this.email, this.password, this.selectedType).subscribe(data => {
      loading.dismiss();
      if(data && data.length > 0) {
        this.appServ.loginUserDetails = data[0];
        this.appServ.loginUserDetails['Type'] = this.selectedType;
        //alert(JSON.stringify(data[0]));
        //{"UserID":"1","FirstName":"","LastName":"",
        //"Email":"m@g.com","IsValid":"1","IsFirstLogin":"0"}
        //if first login 
        /*this.navCtrl.setRoot(CustomerprofilePage, {
          currentState: Constants.MY_INFO,
          type: this.selectedType,
          userId: data[0]['UserID']
        }, {animate: true, direction: 'forward'});*/
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
         
      }else {
          let toast = this.toastCtrl.create({
            message: 'Invalid email or password.',
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-fail'
          });
          toast.present();
      }
      
    },
    err =>  {
      loading.dismiss();
      let toast = this.toastCtrl.create({
            message: Constants.ERROR_MESSAGE,
            duration: 3000,
            position: 'bottom',
            cssClass: 'toast-fail'
          });
      toast.present();
      
    });
  }

  signUp() {
    //this.navCtrl.setRoot(SignupPage, {}, {animate: true, direction: 'forward'});
    this.navCtrl.push(SignupPage, {}, {animate: true, direction: 'forward'});
  }

  forgot() {
    this.navCtrl.push(ForgotPage, {}, {animate: true, direction: 'forward'});
  }
}
