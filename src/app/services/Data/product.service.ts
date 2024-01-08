import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from 'src/app/Models/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = 'https://localhost:7259/api';

  constructor(private http: HttpClient) { }

  create(product:ProductDto): Observable<ProductDto>{
    return this.http.post<ProductDto>(`${this.apiUrl}/Product`, product);
  }

  update(product: ProductDto,id:number): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/Product/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Product/${id}`);
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product`);
  }

  public getproduct(id:number): Observable<ProductDto>
  {
    return this.http.get<ProductDto>(`${this.apiUrl}/product/${id}`);
  }

}
