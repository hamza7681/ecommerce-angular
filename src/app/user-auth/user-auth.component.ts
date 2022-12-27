import { Component, OnInit } from '@angular/core';
import { Cart, Login, SignUp } from '../data-types';
import { UsersService } from '../services/users.service';
import { Product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private users: UsersService, private product: ProductService) {}
  showLogin = false;
  authError = '';
  ngOnInit(): void {
    this.users.userReload();
  }

  signup = (data: SignUp): void => {
    this.users.userSignup(data);
  };
  login = (data: Login): void => {
    this.users.userLogin(data);
    this.users.isLogginError.subscribe((error) => {
      if (error) {
        this.authError = 'Email or Password is not correct';
      } else {
        console.log('else');
      }
    });
    this.localCartToRemoteCart();
  };
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('localCart');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index: number) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.log('Items store in DB');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
