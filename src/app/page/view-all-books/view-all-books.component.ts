import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [HttpClientModule,FormsModule, CommonModule],
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})
export class ViewAllBooksComponent implements OnInit {
  private http;
  public bookList: any = [];
  public selectedBook: any;

  constructor(private httpClient: HttpClient){
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadBooks();    
  }

  loadBooks(){
    this.http.get('http://localhost:8080/book/get').subscribe((data)=>{
      this.bookList = data;
      console.log(this.bookList);   
    });
  }

  deleteBook(){
    this.http.delete(`http://localhost:8080/book/${this.selectedBook.id}`,{ responseType: 'text' }).subscribe( (Response) =>{
      console.log(Response);
      this.loadBooks();
      Swal.fire({
        title: "Good job!",
        text: "Deleted Successfully"
      });
      this.selectedBook = null;
    });
  }

  updateBook(){
    this.http.post('http://localhost:8080/book/add',this.selectedBook).subscribe(data=>{
      console.log("saved!");
      this.loadBooks();
    })
  }

  setSelectedBook(book: any){
    this.selectedBook = book;
    console.log(this.selectedBook)
  }
}
