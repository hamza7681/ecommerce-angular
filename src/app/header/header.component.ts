import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = '';
  sellerName: string = '';
  searchResult: undefined | Product[];
  userName: string = '';
  cartItems: number = 0;
  constructor(private router: Router, private product: ProductService) {}
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((item) => {
      this.cartItems = item.length;
    });
  }
  logout = () => {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  };
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchResult = res;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(value: string) {
    this.router.navigate([`search/${value}`]);
  }
  towardDetail(id: number) {
    this.router.navigate([`/product-details/${id}`]);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }
}
