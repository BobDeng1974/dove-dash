import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

interface User {
  id: string;
  name: string;
}

@Injectable()
export class AuthService {

  private url: string = 'http://livemonitoring.co.in/ciet/scripts';

  public user = new Subject<User>();

  constructor(private router: Router, private http: Http) {

  }

  userData(): Observable<User> {
    return this.user.asObservable();
  }

  login(user): Observable<any> {

    // console.log(user);
    const getLoginUrl = this.url + 'login.php';
    return this.http
      .post(getLoginUrl, user)
      .map(
        res => {
          // console.log(res)
          if (res.json().status == true) {
            localStorage.setItem('currentUser', JSON.stringify(res.json()));
            this.user.next(res.json());
          }
          return res.json();
        },
        err => {
          return err;
        }
      )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/ciet']);
    let data: User = { name: '', id: '' };
    this.user.next(data);

  }

}