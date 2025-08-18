import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, Productservice } from '../../services/productservice';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products:Product[]=[];
  loading:boolean=true;
  constructor(private productservice:Productservice){}

  ngOnInit(): void {
    this.getProducts();
  } 
   
  getProducts():void{
    this.loading=true;
    this.productservice.getAll().subscribe({
      next:(data)=>{
        this.products=data;
        this.loading=false;
      },
      error:(err)=>{
        console.error('خطا در دیافت داده ها',err);
        this.loading=false;
      }
    })
  }
}
