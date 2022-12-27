import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query &&
      this.product.searchProduct(query).subscribe((res) => {
        this.searchResult = res;
      });
  }
}
