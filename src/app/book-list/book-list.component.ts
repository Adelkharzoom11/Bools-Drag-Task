import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { BookService } from '../services/book.service';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    ScrollingModule,
    FormsModule,
    InfiniteScrollModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit, OnDestroy {
  Books: any[] = [];
  selectBook: any[] = [];
  filterBooks: any[] = [];
  isLoading = false;
  currentPage = 1;
  backgroundColor = 'white';
  
  private destroy$ = new Subject<void>(); 

  constructor(private service: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBooks(): void {
    this.isLoading = true;
    this.service.getAllBook(this.currentPage)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe({
        next: (res: any) => {
          if (res && res.docs) {
            this.Books = res.docs;
            this.filterBooks = [...this.Books];
            this.isLoading = false;
          } else {
            console.error('No data received');
          }
        },
        error: (error: any) => {
          console.error('Error fetching books:', error);
          this.isLoading = false;
        }
      });
  }

  appendData(): void {
    this.isLoading = true;
    this.service.getAllBook(this.currentPage)
      .pipe(takeUntil(this.destroy$))  
      .subscribe({
        next: (response: any) => {
          this.filterBooks = [...this.filterBooks, ...response.docs];
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error appending data:', error);
          this.isLoading = false;
        },
      });
  }

  onScroll(): void {
    this.currentPage++;
    this.appendData();
  }

  private _keyword: string = '';

  get keyword(): string {
    return this._keyword;
  }

  set keyword(value: string) {
    this._keyword = value;
    const filterBy = this._keyword.toLowerCase();
    this.filterBooks = this.Books.filter((book: any) =>
      book.title.toLowerCase().includes(filterBy)
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  changeback(color: string): void {
    this.backgroundColor = color;
  }
}
