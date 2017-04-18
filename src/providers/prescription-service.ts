import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
//import { CustomerType } from './../interfaces/customer-type';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PrescriptionService {

  constructor(public http: Http,
              public appServ: AppService) {
    //console.log('Hello LoginService Provider');
    //this.types = [];
  }

  getProducts() {
        //alert(this.appServ.loginUserDetails['UserID']);
        let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getProducts'], {headers: headers})
        .map(res => res.json()); 
    }

  getPacks(prodId: number) {
        //alert(this.appServ.loginUserDetails['UserID']);
        let headers = new Headers();
        headers.append('Productid', String(prodId));
        return this.http.get(Constants.SERVICES[this.appServ.env]['getPacks'], {headers: headers})
        .map(res => res.json()); 
    }
  
  getDosageForm(prodId: number) {
        //alert(this.appServ.loginUserDetails['UserID']);
        let headers = new Headers();
        headers.append('Productid', String(prodId));
        return this.http.get(Constants.SERVICES[this.appServ.env]['getDosageForm'], {headers: headers})
        .map(res => res.json()); 
    }

  getDosageDetails(prodId: number, dosageForm: string) {
        //alert(this.appServ.loginUserDetails['UserID']);
        let headers = new Headers();
        headers.append('Productid', String(prodId));
        headers.append('Dosageform', dosageForm);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getDosageDetails'], {headers: headers})
        .map(res => res.json()); 
    }

    
}
