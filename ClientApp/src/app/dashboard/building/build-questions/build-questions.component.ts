import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../@core/data/building.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-build-questions',
  templateUrl: './build-questions.component.html',
  styleUrls: ['./build-questions.component.scss']
})
export class BuildQuestionsComponent implements OnInit {
  public difficulties: Array<string>;
  public specialties: Array<any>;

  public qDiff: string;
  public question: string;
  public selectedQuestion: number = 1;
  public searchQuantIx: Array<string>;
  public quantSrchText: string;
  public addedQuantIx: Array<{}> = [];
  public answerCount: number = 5;
  public answers: Array<{ answer: string; correct: boolean }> = [
    {
      answer: '',
      correct: true,
    },
    {
      answer: '',
      correct: false,
    },
    {
      answer: '',
      correct: false,
    },
    {
      answer: '',
      correct: false,
    },
    {
      answer: '',
      correct: false,
    }
  ];

  public explanation: string;

  public answerType: string = 'sba';
  public links: Array<any> = [
    {
      link: '',
      isUrl: false,
    }
  ];


  public qOptions = [
    {
      name: 'Vitals',
      status: 'primary',
      icon: 'fa-heartbeat',
      isOn: false,
    },
    {
      name: 'Bloods',
      status: 'primary',
      icon: 'fa-flask',
      isOn: false,
    },
    {
      name: 'Images',
      status: 'primary',
      icon: 'fa-image',
      isOn: false,
    },
    {
      name: 'Medications',
      status: 'primary',
      icon: 'fa-capsules',
      isOn: false,
    },
  ];

  public vitals: {};

  public keyUp = new Subject<string>();
  currLinkIndex: string;


  constructor(private _buildingService: BuildingService) {
    // debounce link so that checking for link only happens when user stops typing.
    const subscription = this.keyUp.pipe(
      map(event => event),
      debounceTime(500),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(500)))
    ).subscribe(link => {
      this.checkLink(link);
    });
  }

  ngOnInit() {
    this.searchQuantIx = this._buildingService.loadQuantIx('');
    this.difficulties = this._buildingService.difficulties;
    this.specialties = this._buildingService.difficulties;
  }

  optionSelected(i) {
    this.qOptions[i].isOn = !this.qOptions[i].isOn;
  }

  searchIxChanged(text) {
    text = text.toLowerCase();
    if (text.length > 1) {
      this.searchQuantIx = this._buildingService.loadQuantIx(text);
    } else {
      this.searchQuantIx = this._buildingService.loadQuantIx('');
    }
  }

  ixSelected(ix) {
    const ixData = this._buildingService.returnIxData(ix);
    this.addedQuantIx.push({ name: ix, data: ixData });
    console.log(this.addedQuantIx);
  }

  correctSelected(i) {
    if (this.answerType === 'sba') {
      this.answers.forEach((item, index) => {
        if (index === i) {
          item.correct = true;
        } else {
          item.correct = false;
        }
      });
    } else {
      this.answers[i].correct = true;
    }
  }

  counterPressed(up) {
    if (up && this.answerCount < 8) {
      this.answerCount += 1;
      this.answers.push({ answer: '', correct: false });
    } else if (!up && this.answerCount > 4) {
      this.answerCount -= 1;
      this.answers.pop();
    }
  }

  changeDifficulty(diff) {
    this.qDiff = diff;
  }

  addLink() {
    this.links.push({
      link: '',
      isUrl: false,
    });
  }

  removeLink(i) {
    this.links.splice(i, 1);
    console.log(this.links);
  }

  linkKeyUp(i) {
    this.currLinkIndex = i;
    if (this.links[i].link) {
      this.keyUp.next(this.links[i].link);
    } else {
      this.links[i].isUrl = false;
    }
  }

  checkLink(link) {
    console.log('testing: ' + link);
    // tslint:disable-next-line:max-line-length
    const regexp = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
    console.log(regexp.test(link));
    if (!regexp.test(link)) {
      this.links[this.currLinkIndex].isUrl = false;
    } else {
      this.links[this.currLinkIndex].isUrl = true;
    }
  }
}
