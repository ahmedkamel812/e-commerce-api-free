import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartProducts:any[] = []
  total:any = 0;
  success:boolean = false

  constructor(private service:CartsService) {}

  ngOnInit(): void {
    this.getAllCarts()
  }

  getAllCarts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  minsAmount(index:number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  blusAmount(index:number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  detactChange() {
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  deleteProduct(index:number) {
    this.cartProducts.splice(index,1)
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  getCartTotal() {
    this.total = 0;
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity
    }
  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return {productId:item.item.id , quantity:item.quantity}
    })

    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    // console.log(Model)

    this.service.createNewCart(Model).subscribe(res => {
      this.success = true
    })
  }


}
