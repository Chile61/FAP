import { Helper } from './../../utils/helper';
import { SignUpService } from './../../providers/signup-service';
import { VerifyuserPage } from './../verifyuser/verifyuser';
import { User } from './../../vo/user';
import { Constants } from './../../utils/constants';
import { AppService } from './../../services/app-service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the Customersignup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customersignup',
  templateUrl: 'customersignup.html',
  providers:[SignUpService]
})
export class CustomersignupPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public appServ: AppService,
              public signUpServ: SignUpService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    
  }

  
  private user: User = new User();
  /*private hideDob: boolean;
  private hideAddress: boolean;
  private primary: string;
  private secondary: string;*/
  //public dob: Date = new Date();
  ionViewDidLoad() {
    //console.log('ionViewDidLoad CustomersignupPage');
    //this.user = new User();
    //pharmacy
    /*if(this.appServ.customerType === Constants.PHARMACY) {
      this.primary = Constants.PNAME;
      this.secondary = Constants.PCNUMBER;
      this.hideDob = true;
      this.hideAddress = false;

    }else {//customer
      this.primary = Constants.FNAME;
      this.secondary = Constants.LNAME;
      this.hideDob = false;
      this.hideAddress = true;
    }*/
  }

  goBack() {
    this.navCtrl.setRoot(SignupPage, {}, {animate: true, direction: 'back'});
  }

  //isEmailValid: boolean = true;
  //isPhoneValid: boolean = true;
  //isPasswordValid: boolean = true;
  validateForm() {
    let message: string = '';
    if(this.user.email === undefined || this.user.email === '') {
      message = "Please enter your email address.";
      //this.isEmailValid = false;

    }else if(!Helper.validateEmail(this.user.email)){
      message = "Please enter valid email address.";
      //this.isEmailValid = false;
    }
    else if(this.user.phone === undefined || String(this.user.phone) === '') {
      message = "Please enter your phone number.";
      //this.isPhoneValid = false;
      
    }else if(String(this.user.phone).length < Constants.PHONE_LENGTH){
      message = "Phone number must have "+String(Constants.PHONE_LENGTH)+" digits.";
      //this.isPhoneValid = false;
      
    }else if(String(this.user.phone).length > Constants.PHONE_LENGTH){
      message = "Phone number cannot be more than "+String(Constants.PHONE_LENGTH)+" digits.";
      //this.isPhoneValid = false;
      
    }else if(this.user.password === undefined || this.user.password === null) {
      message = "Please enter your password.";
    
    }else if(this.user.password.length < Constants.PASSWORD_LENGTH) {
      message = "Password must be atleast "+String(Constants.PASSWORD_LENGTH)+" characters long.";
    
    }else if(this.user.password !== this.user.confirmPassword) {
      message = "New password and confirm password do not match.";
    
    }
    
    if(message == '') {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();
      this.signUpServ.signUp(this.user.email, this.user.password, this.user.phone, this.appServ.signUpType).subscribe(
      data => {
        //alert(JSON.stringify(data));
        loading.dismiss();
        if(data && data.length > 0) {
          //results here
          //loading.dismiss();
          //let otp: number = data[0]['RESULT'];
          this.navCtrl.push(VerifyuserPage, {email: this.user.email}, {animate: true, direction: 'forward'});

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

  onSubmit() {
    this.validateForm();
    /**/
    //this.navCtrl.push(VerifyuserPage, {}, {animate: true, direction: 'forward'})
  }
}
