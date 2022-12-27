import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  popularPorducts: undefined | Product[];
  trendList: undefined | Product[];
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.product.popularProduct().subscribe((res) => {
      this.popularPorducts = res;
    });
    this.product.productList().subscribe((res) => (this.trendList = res));
  }
}
