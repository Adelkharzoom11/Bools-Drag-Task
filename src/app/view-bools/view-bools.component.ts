import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../services/book.service';
import { HeaderComponent } from '../header/header.component'

@Component({
  selector: 'app-view-bools',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './view-bools.component.html',
  styleUrls: ['view-bools.component.scss'],
})
export class ViewBoolsComponent implements OnInit {
  projects: any[] = [];
  currentPage = 1;
  totalPages = 1; 

  constructor(private service: BookService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.service.getAllBook(this.currentPage).subscribe({
      next: (res: any) => {
        if (res && res.docs) {
          this.projects = res.docs;
          this.totalPages = Math.ceil(res.numFound / 10); 
        } else {
          console.error('No data received');
        }
      },
      error: (err: any) => console.error('Error fetching data', err),
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProjects();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProjects();
    }
  }
}
