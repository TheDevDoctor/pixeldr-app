import { Component, OnInit } from '@angular/core';
// import { CountryOrdersComponent } from '../../e-commerce/country-orders/country-orders.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-top-pop-card',
  templateUrl: './top-pop-card.component.html',
  styleUrls: ['./top-pop-card.component.scss'],
})
export class TopPopCardComponent implements OnInit {

  constructor(private toasterService: ToasterService) { }

  flipped = false;

  config: ToasterConfig;

  position = 'toast-top-right';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = false;

  scenarios: Array<{}> = [
    {
      scenario: 'The heart attack',
      rating: 4.9, played: 1287,
      difficulty: 'Easy',
      // tslint:disable-next-line:max-line-length
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes? Click play to play the history now or click playlist to add it to your playlist.'
    },
    {
      scenario: 'I can\'t breathe',
      rating: 4.7, played: 187,
      difficulty: 'Easy', description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
    {
      scenario: 'Where are my legs',
      rating: 4.7,
      played: 127,
      difficulty: 'Easy',
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
    {
      scenario: 'What\'s your name?',
      rating: 4.3,
      played: 128,
      difficulty: 'Easy',
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
    {
      scenario: 'Sex, drugs and hospital',
      rating: 4.2,
      played: 4287,
      difficulty: 'Easy',
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
    {
      scenario: 'Ow that hurt\'s',
      rating: 4.1,
      played: 1287,
      difficulty: 'Easy',
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
    {
      scenario: 'Who turned the lights out',
      rating: 3.9,
      played: 12287,
      difficulty: 'Easy',
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
    {
      scenario: 'I\'m all swollen',
      rating: 3.2,
      played: 1287,
      difficulty: 'Easy',
      description: 'Can you take a competent history from this patient with chest pain. One of the most important presentations to master. Have you got what it takes?'
    },
  ];

  currentScenario: {} = this.scenarios[0];

  ngOnInit() {
  }

  listItemSelected(event: any) {
    this.toggleView();
    this.currentScenario = this.scenarios[event.target.dataset.index];
  }

  toggleView() {
    this.flipped = !this.flipped;
  }

  public makeToast(event: any) {
    // console.log(event);
    this.showToast(this.type, this.title, this.content);
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    // this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
  }
}
