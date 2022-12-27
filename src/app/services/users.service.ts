import { EventEmitter, Injectable } from '@angular/core';
import { Login, Product, SignUp } from '../data-types';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignup(data: SignUp) {
    return this.http
      .post('http://localhost:3000/users', data, {
        observe: 'response',
      })
      .subscribe((res) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(res.body));
        this.router.navigate(['/']);
      });
  }
  userLogin(data: Login) {
    this.http
      .get(
        `http://localhost:3000/users?email=${data.email}&passsword=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.router.navigate(['/']);
        } else {
          this.isLogginError.emit(true);
        }
      });
  }
  userReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
