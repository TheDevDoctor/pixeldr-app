import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { BotService, ConnectionInfo } from '../../../@core/bot/bot.service';
import { BuildingService } from '../../../@core/data/building.service';
// import * as data from '../../../@core/testing_files/history.json';
import { ElementRef, Renderer2 } from '@angular/core';

// const historyData = (<any>data).default.History;

@Component({
  selector: 'ngx-history-component-build',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChildren('templateDropdown') templateDropdowns: QueryList<any>;
  @ViewChildren('dropdownIcon') dropdownIcons: QueryList<any>;

  adaptationsArray: Array<{}> = [];
  correctQsArray: Array<{}> = [];
  adaptations: {};
  correctQs: {};

  loading: boolean = true;

  displayArray: Array<any>;
  messages: Array<any> = [];

  viewModel = 'templates';
  searchQuestions: Array<any> = [];
  searchTemplates: Array<any> = [];

  constructor(private botService: BotService, private _buildingService: BuildingService, private rd: Renderer2) { }

  ngOnInit() {
    this.searchQuestions = this._buildingService.loadQuestions('');
    this.searchTemplates = this._buildingService.loadTemplates('');

    this.messages = this._buildingService.getMessages();
    this.adaptations = this._buildingService.getAdaptedQs();
    this.correctQs = this._buildingService.getCorrectQs();

    this.adaptationsArray = this._buildingService.getAdaptedQsArr();
    this.correctQsArray = this._buildingService.getCorrectQsArr();


    if (this.botService.connectionInfo) {
      this.connectToWebsocket();
      this.loading = false;
    } else {
      this.botService.getConnectionInfo().subscribe(
        (connectData: ConnectionInfo) => {
          this.botService.connectToBot(connectData),
            this.connectToWebsocket();
          this.loading = false;
          this.botService.connectionInfo = connectData;
        },
        error => console.log(error)
      );
    }
  }

  connectToWebsocket() {
    this.botService.messages.subscribe(msg => {
      console.log(msg);
      try {
        if (msg.from.id === 'PixelDr-Bot-Patients') {
          this.addReply(msg);
        } else {
          return;
        }
      } catch (e) {
        console.log('Error: ', e);
      }
    });
  }

  sendMessage($event) {
    const message = {
      type: 'text',
      text: $event.message,
      reply: true,
      user: {
        name: 'Matt Stubbs',
        avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg'
      },
      sender: 'Matt Stubbs',
      date: new Date(),
      msgNum: this.messages.length + 1
    };
    this.messages.push(message);
    this.botService.sendMessage($event.message).subscribe((resData: any) => this.displayArray = resData);
  }

  private addReply(responseDict) {
    let response: string;
    // let responseArray: Array<any>;
    // if (responseDict.text[0] == '{') {
    //   responseArray = responseDict.text.split('|')
    //   console.log(responseArray)
    //   // response = dict.answer
    // } else {}

    const qnaResponse = JSON.parse(responseDict.text);
    // responseArray = this.extractResponseArray(responseDict.text);
    response = this.extractRightResponse(qnaResponse);

    const message = {
      type: 'text',
      text: response,
      reply: false,
      user: {
        name: 'Bot',
        avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg'
      },
      sender: 'Bot',
      date: new Date(),
      data: qnaResponse.metadata,
      msgNum: this.messages.length + 1
    };

    this.messages.push(message);
  }

  extractResponseArray(text) {
    const arr = text.split('|');
    arr[2] = arr[2].replace('q: ', '');
    arr.forEach(function (element, index) {
      arr[index] = element.trim();
    });
    return arr;
  }

  extractRightResponse(qnaResponse) {
    let response: string;
    if (qnaResponse.metadata[0].value in this.adaptations) {
      response = this.adaptations[qnaResponse.metadata[0].value];
    } else {
      response = qnaResponse.answer;
    }
    return response;
  }

  adaptResponsePressed(msgData) {
    const qNum = msgData.data[0].value;
    if (!(qNum in this.adaptations)) {
      this.adaptationsArray.push(
        {
          question: this.messages[(msgData.msgNum - 2)].text,
          qNum: qNum,
          adaptedText: '',
          originalText: msgData.text,
          msgNum: msgData.msgNum
        }
      );
      this.adaptations[qNum] = '';
      console.log(this.adaptations);
    }
  }

  correctQuestionPressed(qData) {
    const qNum = this.messages[(qData.msgNum)].data[0].value;
    if (!(qNum in this.correctQs)) {
      this.correctQsArray.push(
        {
          qNum: qNum,
          question: qData.text
        }
      );
      this.correctQs[qNum] = qData.text;
    }
  }

  onCorrectSearchQuestion(qData) {
    if (!(qData.qNum in this.correctQs)) {
      this.correctQsArray.push(
        {
          qNum: qData.qNum,
          question: qData.question
        }
      );
      this.correctQs[qData.qNum] = qData.question;
    }
  }

  onEditSearchQuestion(qData) {
    if (!(qData.qNum in this.adaptations)) {
      this.adaptationsArray.push({
        question: qData.question,
        qNum: qData.qNum,
        adaptedText: '',
        originalText: qData.originalResponse,
        msgNum: null
      }
      );
      this.adaptations[qData.qNum] = '';
    }
  }

  searchTextChanged(text) {
    text = text.toLowerCase();
    if (text.length > 3) {
      if (this.viewModel === 'questions') {
        this.searchQuestions = this._buildingService.loadQuestions(text);
      } else {
        this.searchTemplates = this._buildingService.loadTemplates(text);
      }
    } else {
      if (this.viewModel === 'questions') {
        this.searchQuestions = this._buildingService.loadQuestions('');
      } else {
        this.searchTemplates = this._buildingService.loadTemplates('');
      }
    }
  }

  templateQsDropdown(index) {
    const dropdown = this.templateDropdowns.toArray()[index];
    const dropdownIcon = this.dropdownIcons.toArray()[index].nativeElement;
    dropdown.toggle();
    if (dropdown.collapsed) {
      this.rd.removeClass(dropdownIcon, 'nb-arrow-down');
      this.rd.addClass(dropdownIcon, 'nb-arrow-right');
    } else {
      this.rd.removeClass(dropdownIcon, 'nb-arrow-right');
      this.rd.addClass(dropdownIcon, 'nb-arrow-down');
    }
  }

  searchTabPressed(event) {
    if (event === 'templates') {
      this.searchQuestions = this._buildingService.loadQuestions('');
    } else {
      this.searchTemplates = this._buildingService.loadTemplates('');
    }
  }

  onTemplateAddButton(template) {
    template.questions.forEach((q, index) => {
      if (template.included.edit[index]) {
        this.onEditSearchQuestion(this.searchQuestions[q - 1]);
      }

      if (template.included.correct[index]) {
        this.onCorrectSearchQuestion(this.searchQuestions[q - 1]);
      }
    });
  }
}
