import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Book } from "./book.model";

@Injectable({ providedIn: "root" })

export class BooksService {
  private books: Book[] = [];
  private booksUpdated = new Subject<{ books: Book[]; bookCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getBooks(booksPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${booksPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; books: any; maxBooks: number }>(
        "http://localhost:3000/api/books" + queryParams
      )
      .pipe(
        map(bookData => {
          return {
            books: bookData.books.map(book => {
              return {
                title: book.title,
                content: book.content,
                price: book.price,
                id: book._id,
                imagePath: book.imagePath,
                creator: book.creator
              };
            }),
            maxBooks: bookData.maxBooks
          };
        })
      )
      .subscribe(transformedBookData => {
        this.books = transformedBookData.books;
        this.booksUpdated.next({
          books: [...this.books],
          bookCount: transformedBookData.maxBooks
        });
      });
  }

  getBookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  getBook(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      price: number;
      imagePath: string;
      creator: string;
    }>("http://localhost:3000/api/books/" + id);
  }

  addBook(title: string, content: string, price: number, image: File) {
    const bookData = new FormData();
    bookData.append("title", title);
    bookData.append("content", content);
    bookData.append("price", price.toString());
    bookData.append("image", image, title);
    this.http
      .post<{ message: string; book: Book }>(
        "http://localhost:3000/api/books/",
        bookData
      )
      .subscribe(responseData => {
        // this.router.navigate(["/listbook"]);
      });
  }

  updateBook(id: string, title: string, content: string, price: number, image: File | string) {
    let bookData: Book | FormData;
    if (typeof image === "object") {
      bookData = new FormData();
      bookData.append("id", id);
      bookData.append("title", title);
      bookData.append("content", content);
      bookData.append("price", price.toString());
      bookData.append("image", image, title);
    } else {
      bookData = {
        id: id,
        title: title,
        content: content,
        price: price,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put("http://localhost:3000/api/books/" + id, bookData)
      .subscribe(response => {
        // this.router.navigate(["/listbook"]);
      });
  }

  deleteBook(bookId: string) {
    return this.http
      .delete("http://localhost:3000/api/books/" + bookId);
  }

  addToCart(productId) {
    //console.log(productId);
    return this.http.get('http://localhost:3000/api/cart/addToCart/' + productId);
  }

}
