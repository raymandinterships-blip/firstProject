import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product, Productservice } from '../../services/productservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products:Product[]=[];
  loading:boolean=true;

  // create newProduct in modal
  showModal=false;
  newProduct={
    id:'',
    title:'',
    description:'',
    image:'',
  }

  // edit modal
  showEditModal=false;
  editProductData={id:'',title:'',description:'',image:''}

  // delete modal
  showDeleteModal=false;
  deleteProductId:string | null=null;


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

  // addProduct():void{
  //   const newProduct={
  //     id:String(Date.now()),
  //     title:' New Product',
  //     description:'Sample description',
  //     image:'https://picsum.photos/300/200?random='+Date.now()
  //   }
  //   this.productservice.create(newProduct).subscribe(()=>{
  //     this.products.push(newProduct);
  //   })
  // }



  openModal():void{
    this.showModal=true;
    this.newProduct={id:'',title:'',description:'',image:''}
  }
  closeModal():void{
    this.showModal=false
  }

  saveProduct():void{
    this.newProduct.id=String(Date.now());
    this.newProduct.image='https://picsum.photos/300/200?random='+Date.now();
    this.productservice.create(this.newProduct).subscribe(()=>{
      this.products.push({...this.newProduct});
      this.closeModal()
    })
  }


  // open edit modal
  openEditModal(product:Product):void{
    this.editProductData={...product};
    this.showEditModal=true;
  }

  // close edit modal
  closeEditModal(){
    this.showEditModal=false;
  }

  editProduct(){
    this.productservice.update(this.editProductData).subscribe(()=>{
    this.products=this.products.map( p=>
    p.id===this.editProductData.id ? this.editProductData : p);

    this.closeEditModal();
    })
    
  }
// open delete modal
  openDeleteModal(id:string){
    this.deleteProductId=id;
    this.showDeleteModal=true;

  }
// close delete modal
  closeDeleteModal(){
    this.showDeleteModal=false;
    this.deleteProductId=null;
  }

  deleteProduct(){
    if(this.deleteProductId){
      this.productservice.delete(this.deleteProductId).subscribe(()=>{
      this.products=this.products.filter(p=>p.id !== this.deleteProductId)
      this.closeDeleteModal()
      })
    }
  }
}
