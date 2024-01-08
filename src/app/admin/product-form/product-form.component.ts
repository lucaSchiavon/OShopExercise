import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/Data/category.service';
import { CategoryDto } from 'src/app/Models/CategoryDto';
import { ProductService } from 'src/app/services/Data/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDto } from 'src/app/Models/ProductDto';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
categories: CategoryDto[];
product: any= {};
id:number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService, 
    private productService: ProductService) { 
    console.log("aaa");
    //uso con observable
    categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    });

    this.id=Number(this.route.snapshot.paramMap.get('id'));
  
    if (this.id) this.productService.getproduct(this.id).subscribe(data=>{
      this.product=data;
    });
   
  
  }

   

    save(product) {
      
      this.id=Number(this.route.snapshot.paramMap.get('id'));

      if (this.id)
      {
        
        product.id=this.id;
        this.productService.update(product,this.id).subscribe(updatedProduct => {
          console.log('Product updated successfully:', updatedProduct);
          this.router.navigate(['/admin/products'])
        }, error => {
          console.error('Error updating product:', error);
        });
      }
      else
      {
       
        this.productService.create(product).subscribe(
          (response) => {
            console.log('Prodotto salvato con successo:', response);
            this.router.navigate(['/admin/products'])
          },
          (error) => {
            console.error('Errore durante il salvataggio del prodotto:', error);
          }
        );
      }

  
  
    }

    delete(){
      
      if (!confirm('are you shure you want to delete this product?')) return;
      
        this.productService.delete(this.id)
        .subscribe(
          () => {
            console.log('Product deleted successfully');
            this.router.navigate(['/admin/products'])
            // Additional logic after deletion
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
      
    }

  ngOnInit(): void {
  }


}
