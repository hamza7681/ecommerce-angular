import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin = false;
  authError = '';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signup = (data: SignUp): void => {
    this.seller.userSignUp(data);
  };
  login = (data: Login): void => {
    this.seller.userLogin(data);
    this.seller.isLogginError.subscribe((error) => {
      if (error) {
        this.authError = 'Email or Password is not correct';
      }
    });
  };
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
