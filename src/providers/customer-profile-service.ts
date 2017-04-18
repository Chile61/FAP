import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
//import { CustomerType } from './../interfaces/customer-type';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CustomerProfileService {

  constructor(public http: Http,
              public appServ: AppService) {
    //console.log('Hello LoginService Provider');
    //this.types = [];
  }

  updateCustomerMyInfo(fn: string, ln: string, gender: string, dob: Date) {
        let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        headers.append('Fn', fn);
        headers.append('Ln', ln);
        headers.append('Gender', String(gender));
        headers.append('Dob', String(dob));
        return this.http.get(Constants.SERVICES[this.appServ.env]['updateCustomerMyInfo'], {headers: headers})
        .map(res => res.json());
    }

   insertUpdateCustomerAddress(address1: string, zipCode: number, addressId: number = 0) {
      let headers = new Headers();
        headers.append('Addressid', String(addressId));
        headers.append('Address', address1);
        headers.append('Type', this.appServ.loginUserDetails['Type']);
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        headers.append('Zipcode', String(zipCode));
        return this.http.get(Constants.SERVICES[this.appServ.env]['insertUpdateCustomerAddress'], {headers: headers})
        .map(res => res.json());
   }
   
   insertUpdateCustomerInsurance(insuranceId: number, insuranceNumber: string, insuranceName: string, insuranceCompId: number, frontPath: string, backPath: string) {
   //insertUpdateCustomerInsurance(compName: string, policyNumber: string, frontImgPath: string = '', backImgPath: string = '', insuranceId: number = 0) {
      let headers = new Headers();
        headers.append('Insuranceid', String(insuranceId));
        headers.append('Insurancenumber', insuranceNumber);
        headers.append('Insurancename', insuranceName);
        headers.append('Insurancecompid', String(insuranceCompId));
        headers.append('Frontpath', frontPath);
        headers.append('Backpath', backPath);
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        
        return this.http.get(Constants.SERVICES[this.appServ.env]['insertUpdateCustomerInsurance'], {headers: headers})
        .map(res => res.json());
   }

   getInsurances() {
     let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getInsurances'], {headers: headers})
        .map(res => res.json());
   }

   getCustomer() {
     //alert(this.appServ.loginUserDetails['UserID']);
     let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getCustomer'], {headers: headers})
        .map(res => res.json());
   }

   getCustomerInsurances() {
     //alert(this.appServ.loginUserDetails['UserID']);
     let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getCustomerInsurances'], {headers: headers})
        .map(res => res.json());
   }

   getCustomerAddresses() {
     //alert(this.appServ.loginUserDetails['UserID']);
     
     let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        headers.append('Type', this.appServ.loginUserDetails['Type']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getCustomerAddresses'], {headers: headers})
        .map(res => res.json());
   }

   getChildren() {
     //alert(this.appServ.loginUserDetails['UserID']);
     
     let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        //headers.append('Type', this.appServ.loginUserDetails['Type']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getChildren'], {headers: headers})
        .map(res => res.json());
   }


}
