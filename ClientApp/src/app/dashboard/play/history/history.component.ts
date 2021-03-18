import { Component, OnInit } from '@angular/core';
import { BotService, ConnectionInfo } from '../../../@core/bot/bot.service';
import * as data from '../../../@core/testing_files/history.json';
import { UserService } from '../../../@core/data/users.service';

const historyData = (<any>data).default.History;

@Component({
  selector: 'ngx-history-component',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayArray: Array<any>;
  messages: Array<{}> = [];
  connectDict: ConnectionInfo;
  loading: boolean = true;

  user: any;

  constructor(private botService: BotService, private userService: UserService) {
    // console.log(historyData);
  }

  ngOnInit() {
    console.log('On init');
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);

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
        name: this.user.signinname,
        avatar: 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg'
      },
      sender: 'Matt Stubbs',
      date: new Date()
    };
    this.messages.push(message);
    this.botService.sendMessage($event.message).subscribe((resData: any) => this.displayArray = resData);
  }

  private addReply(responseDict) {
    let response: string;
    const qnaResponse = JSON.parse(responseDict.text);
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
      data: qnaResponse.metadata
    };

    this.messages.push(message);
    this.botService.updateSections(qnaResponse.metadata[1].value);
    console.log(qnaResponse.metadata[1].value);
  }

  extractRightResponse(qnaResponse) {
    let response: string;
    if (qnaResponse.metadata[0].value in historyData.AdaptedResponses) {
      response = historyData.AdaptedResponses[qnaResponse.metadata[0].value];
    } else {
      response = qnaResponse.answer;
    }
    return response;
  }

}
