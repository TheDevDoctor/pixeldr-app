import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../@core/feed/news.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'ngx-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  news: Array<any>;

  constructor(newsService: NewsService, private _sanitizer: DomSanitizer) {
    newsService.getMedicalNews().subscribe(news => {
      console.log('news data recieved');
      this.news = news.articles;
    });
    // this.news = newsService.news.articles;
   }

  ngOnInit() {
  }

  returnImageSanitizationBypass(url): SafeStyle {
    const image = this._sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
    return image;
  }

}
