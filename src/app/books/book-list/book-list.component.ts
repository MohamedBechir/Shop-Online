import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BooksService } from "../books.service";
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  // books=[
  //   {title: 'fisrt book', content: 'This is the first book\'s content'},
  //   {title: 'Second book', content: 'This is the Second book\'s content'},
  //   {title: 'Third book', content: 'This is the Third book\'s content'},
  // ];
  books: Book[]= [];
  isLoading = false;
  totalBooks = 0;
  booksPerPage = 5 ;
  currentPage= 1 ;
  pageSizeOptions = [1, 2, 4, 10];
  userIsAuthenticated = false ;
  userId: string ;
  private booksSub: Subscription;
  private authStatusSub: Subscription;
  alert = false;

  constructor(public booksService: BooksService, private authService: AuthService) {}

  ngOnInit(){
    this.isLoading = true;
    this.booksService.getBooks(this.booksPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.booksSub= this.booksService.
      getBookUpdateListener()
      .subscribe((bookData: {books: Book[], bookCount: number} )=>{
          this.isLoading= false;
          this.totalBooks= bookData.bookCount;
          this.books = bookData.books;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this. userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });

  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1 ;
    this.booksPerPage = pageData.pageSize;
    this.booksService.getBooks(this.booksPerPage,this.currentPage);
  }

  onDelete(bookId: string){
    this.booksService.deleteBook(bookId).subscribe(()=>{
     this.booksService.getBooks(this.booksPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }
  ngOnDestroy(){
  this.booksSub.unsubscribe();
  this.authStatusSub.unsubscribe();

  }
  onAddToCart(productId: string) {
    //console.log("here" + productId);
   this.booksService.addToCart(productId).subscribe((Response) => {
    // console.log(Response);
    this.alert = true;
   });
  }


}
