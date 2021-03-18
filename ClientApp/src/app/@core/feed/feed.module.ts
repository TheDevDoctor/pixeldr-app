import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';

const SERVICES = [
  NewsService,
];

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [...SERVICES],
})
export class FeedModule { }
