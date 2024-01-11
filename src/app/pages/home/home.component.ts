import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productList:any[]=[]
  newProductList:any[]=[]
  // categoryList:any[]=[]
  cartObj : any = {
    "CartId": 0,
    "CustId": 1,
    "ProductId": 0,
    "Quantity": 0,
    "AddedDate": "2023-04-27T07:12:40.926Z"
  };

  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    debugger;
    this.loadAllProducts();
    for (let index = 0; index < this.productList.length; index++) {
      const element = this.productList[index];
      if (element.productPrice >1000 && element.productId !==11) {
        this.newProductList.push(element)
      }
    }
    
    
    // for (let index = 0; index < this.productList.length; index++) {
    //   this.categoryList.push(this.productList[index].categoryName) 
    // }
  }

  loadAllProducts() {
    debugger;
    this.productService.getAllProducts().subscribe((result: any)=>{
      this.productList = result.data;
    })
}
 addItemToCart(productId: number) {
    debugger;
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any)=>{
        if(result.result) {
        alert("Product Added To Cart");
        this.productService.cartAddedSubject.next(true);
      }
   })
}
}