import{ Component, OnInit} from '@angular/core';
import {  FormGroup, FormControl, Validators} from '@angular/forms';

import { ActivatedRoute, ParamMap  } from '@angular/router';

import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']

})
export class BookCreateComponent implements OnInit{
   // @Output() postCreated= new EventEmitter<Post>();
  // newPost = 'NO CONTENT';
  enteredTitle="";
  enteredContent= "";
  book: Book;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "createBook";
  private bookId: string;
  alert = false;
  alertup = false;


constructor(public booksService: BooksService, public route: ActivatedRoute){}

 ngOnInit() {
   this.form = new FormGroup({
     'title': new FormControl(null,
      {validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'price': new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
   });
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("bookId")) {
        this.mode = "edit";
        this.bookId = paramMap.get("bookId");
        this.isLoading = true ;
        this.booksService.getBook(this.bookId).subscribe(bookData =>{
        this.isLoading = false ;
        this.book = {
          id: bookData._id,
          title: bookData.title,
          content: bookData.content,
          price: bookData.price,
          imagePath: bookData.imagePath,
          creator: bookData.creator

         };
        this.form.setValue({
           'title': this.book.title,
           'content': this.book.content,
           'price': this.book.price,
           image: this.book.imagePath
          });
        });
      }else{
      this.mode = 'createBook';
      this.bookId = null;
      }
    });
  }


// click listener
onImagePicked(event: Event){
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: file});
  this.form.get("image").updateValueAndValidity();
  // console.log(file);
  // console.log(this.form);
  const reader = new FileReader();
  reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  reader.readAsDataURL(file);
  }




 onSaveBook(){
   if ( this.form.invalid){
     return;
   }
   this.isLoading = true ;
   if (this.mode === 'createBook') {
     this.booksService.addBook(
        this.form.value.title ,
        this.form.value.content,
        this.form.value.price,
        this.form.value.image
     );
     this.alert = true;
   }else {
     this.booksService.updateBook(
       this.bookId,
      this. form.value.title,
      this.form.value.content,
      this.form.value.price,
      this.form.value.image
      );
      this.alertup = true;
   }
  // alert("post Added");
   //this.newPost= this.enteredValue ;
  // const post: Post = {
  //    title: form.value.title ,
  //    content: form.value.content
  //   };
   this.form.reset();
 }

}
