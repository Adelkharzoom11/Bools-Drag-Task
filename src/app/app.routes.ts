import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { ViewBoolsComponent } from './view-bools/view-bools.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  { path: '', component: BookListComponent, pathMatch: 'full' },
  { path: 'BookList', component: BookListComponent, pathMatch: 'full' },
  { path: 'viewbooks', component: ViewBoolsComponent, pathMatch: 'full' },
  { path: '**', component: BookListComponent, pathMatch: 'full' },
];
