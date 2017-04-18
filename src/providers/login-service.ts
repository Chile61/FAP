import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
import { CustomerType } from './../interfaces/customer-type';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import {Headers, RequestOptions} from 'angular2/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

/*const USER_DETAILS = [{
  email: 'megharajdeepak@gmail.com', 
  firstName: 'Deepak', 
  lastName: 'MS',
  type: 'c'  
}];*/


@Injectable()
export class LoginService {

  constructor(public http: Http, 
              public appServ: AppService) {
    //console.log('Hello LoginService Provider');
    //this.types = [];
  }

  //types: Array<CustomerType>;

  
  getCustomerTypes(){
    let headers = new Headers();
    headers.append('Email', '');
    //headers.append('Key', 'pwd');
    //headers.append('Type', '2');
    //let options = new RequestOptions({headers: headers});

        return this.http.get(Constants.SERVICES[this.appServ.env]['customerType'], {headers: headers})
        .map(res => res.json());
 // , {headers: this.getHeaders()}  
  }


  /*getTypes() {
    this.http.get('http://dezyns.com/pap/services/get_customer_type.php')
    .subscribe((data)=>  alert(data))
  }*/

  loginAttempt(email: string, pwd: string, type: number) {
        let headers = new Headers();
        headers.append('Email', email);
        headers.append('Key', pwd);
        headers.append('Type', String(type));
        return this.http.get('http://dev.findapharma.com/api/validate.php', {headers: headers})
        .map(res => res.json());

        /*return Observable.create(observer => {
            observer.next(USER_DETAILS);
            observer.complete();
        });*/
 
    }

    getPassword(email: string, type: number){
      let headers = new Headers();
      headers.append('Email', email);
      //alert(JSON.stringify(this.appServ.loginUserDetails));
      headers.append('Type', String(type));
      return this.http.get(Constants.SERVICES[this.appServ.env]['forgot'], {headers: headers})
          .map(res => res.json());
           
    }

    /*loginAttempt (): Observable<any[]> {
    return this.http.get('http://dezyns.com/pap/services/get_customer_type.php')
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    alert(body);
    //return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }*/
}
