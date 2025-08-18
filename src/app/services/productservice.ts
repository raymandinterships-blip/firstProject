import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Product{
  id:string,
  title:string,
  description:string,
  image:string
}



@Injectable({
  providedIn: 'root'
})
export class Productservice {
  private baseUrl='http://localhost:3000/data';
  constructor(private http:HttpClient){}

// get all products
  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }


// get special product with id
  get(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

// create a product
  create(product:Product):Observable<Product>{
    return this.http.post<Product>(this.baseUrl,product)
  }

// edit a product
  update(product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`,product)
  }

  // delete a product
  delete(id:string):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

}
