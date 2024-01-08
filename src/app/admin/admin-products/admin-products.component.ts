import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/Data/product.service';
import { ProductDto } from 'src/app/Models/ProductDto';
import { Subscription } from 'rxjs/internal/Subscription';
//import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  products: ProductDto[];
  subscription: Subscription;
  filteredProducts:ProductDto[];
 // tableResource: DataTableResource<ProductDto>;
  items:ProductDto[]=[];
  itemCount:number;

  constructor(private productService:ProductService) { 
    
  console.log("siamo nel costruttore");

    this.subscription=  this.productService.getAll().subscribe(data=>{
      this.filteredProducts= this.products=data;
      //inizializzo la tabella
     //this.initializeTable(data);
     });
    
  }

  ngOnInit(): void {
  }

  /* ngOnDestroy(){
  this.subscription.unsubscribe();
  } */

  /* private initializeTable(products:ProductDto[]){
    this.tableResource=new DataTableResource(products);
    this.tableResource.query({offset:0})
    .then(items=>this.items=items);
    this.tableResource.count()
    .then(count=>this.itemCount=count);
  }

  reloadItems(params){
    if (!this.tableResource) return;
    this.tableResource.query(params)
    .then(items=>this.items=items);
  } */

  filter(query:string){
    this.filteredProducts=(query) ?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
    console.log(query);
  }

}
