import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
//import { CustomerType } from './../interfaces/customer-type';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SignUpService {

  constructor(public http: Http,
              public appServ: AppService) {
    //console.log('Hello LoginService Provider');
    //this.types = [];
  }

  signUp(email: string, pwd: string, phone: number, type: number) {
        let headers = new Headers();
        headers.append('Email', email);
        headers.append('Key', pwd);
        headers.append('Type', String(type));
        headers.append('Phone', String(phone));
        return this.http.get(Constants.SERVICES[this.appServ.env]['signup'], {headers: headers})
        .map(res => res.json()); 
    }

    verifyUser(email: string, type: number, otp: number) {
        let headers = new Headers();
        headers.append('Email', email);
        headers.append('Otp', String(otp));
        headers.append('Type', String(type));
        return this.http.get(Constants.SERVICES[this.appServ.env]['verify'], {headers: headers})
        .map(res => res.json());
    }
}
