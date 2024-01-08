import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/Models/CategoryDto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private apiUrl = 'https://localhost:7259/api';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  }

  /*getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/category`)
    ;
  }*/

  //uso con ritorno observable
  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/category`)
    .pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
  )};

  //uso con promise
  /*getCategories(): Promise<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.apiUrl}/category`)
      .toPromise()
      .then(categories => categories.sort((a, b) => a.name.localeCompare(b.name)));
  };*/

 /*getCategories2(): CategoryDto[] {

  let categories:CategoryDto[];
console.log("sono dentro getCategories")
    this.http.get<CategoryDto[]>(`${this.apiUrl}/category`)
    .pipe(
      map(categories => categories.sort((a, b) => a.name.localeCompare(b.name)))
    )
    .subscribe(data=>{
      categories=data;
      console.log(categories)
      return  categories;
    })    
    console.log(categories)
    return  categories;
  };

  async getCategories3(): Promise<CategoryDto[]> {
    try {
      const categories = await this.http
        .get<CategoryDto[]>(`${this.apiUrl}/category`)
        .pipe(
          map((categories) =>
            categories.sort((a, b) => a.name.localeCompare(b.name))
          )
        )
        .toPromise();

      console.log(categories);
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error; // Propagate the error
    }
  };


  /*async exampleUsage():CategoryDto[] {
    let categories;
    try {
      categories = await this.getCategories3();
      console.log(categories);
      return categories;
      // Use categories...
    } catch (error) {
      console.error('Error in exampleUsage:', error);
      return categories;
    }
  };*/

  
  
}
