import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
//import { CustomerType } from './../interfaces/customer-type';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfirmUserDetailsService {

  constructor(public http: Http,
              public appServ: AppService) {
    //console.log('Hello LoginService Provider');
    //this.types = [];
  }

  insertPrescriptionItem(item: any) {
    //item = {"prodName":"ACANYA","prodId":"23","form":"GEL",
    //"strength":"10mg/g","quantity":"4","noOfRefills":"5","pHeaderId":"13"}

        let headers = new Headers();
        headers.append('Pheaderid', item['pHeaderId']);
        headers.append('Prodid', item['prodId']);
        headers.append('Units', item['quantity']);
        headers.append('Noofrefills', item['noOfRefills']);
        headers.append('Dosageunit', item['strength']);
        /*headers.append('Fn', fn);
        headers.append('Ln', ln);
        headers.append('Gender', String(gender));
        headers.append('Dob', String(dob));*/
        return this.http.get(Constants.SERVICES[this.appServ.env]['insertPrescriptionItem'], {headers: headers})
        .map(res => res.json());
    }

    insertPrescriptionImageHeader(item: any) {
      let headers = new Headers();
      headers.append('Userid', this.appServ.loginUserDetails['UserID']);
      headers.append('Pharmacyid', item['pharmacyId']);
      headers.append('Insuranceid', item['insuranceId']);
      headers.append('Addressid', item['addressId']);
      headers.append('Imagepaths', item['imagePaths']);
      headers.append('Status', item['status']);
      headers.append('Isimageonly', item['isImageOnly']);
      headers.append('Relationid', item['relationId']);
      return this.http.get(Constants.SERVICES[this.appServ.env]['insertPrescriptionImageHeader'], {headers: headers})
      .map(res => res.json());
    }

    sendEmail(item: any) {
      let headers = new Headers();
      //headers.append('Userid', this.appServ.loginUserDetails['UserID']);
      headers.append('Email', item['pharmacyEmail']);
      headers.append('Phone', item['pharmacyPhone']);
      
      return this.http.get(Constants.SERVICES[this.appServ.env]['sendEmail'], {headers: headers})
      .map(res => res.json());
    }

   
}
