import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: string | undefined;
  icon = faTrash;
  edit = faEdit
  constructor(private product: ProductService) {}
  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.productMessage = 'Product is deleted successfully';
        this.list();
      }
      setTimeout(() => (this.productMessage = undefined), 3000);
    });
  }

  list() {
    this.product.productList().subscribe((res) => {
      this.productList = res;
    });
  }
}
