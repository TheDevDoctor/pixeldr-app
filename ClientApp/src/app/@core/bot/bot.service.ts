import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer Sl43Y_STssg.cwA.Ek8.tvt3fyq1U4WtaWlxs4dPxIclMLYoZrBPkI3BMTpD90Q',
    'Content-Type': 'application/json'
  })
};

export interface Message {
  type: string;
  from: {};
  text: string;
}

export interface Response {
  activities: Array<{}>;
  watermark: string;
}

export interface ConnectionInfo {
  conversationId: string;
  expires_in: number;
  referenceGrammarId: string;
  streamUrl: string;
  token: string;
}



@Injectable({
  providedIn: 'root'
})
export class BotService {
  public messages: Subject<any>;
  // public sections: Subject<any>;

  private sectionsArray: Array<string> = ['pc', 'pmhx', 'dh', 'fh', 'sh', 'ros', 'ice', 'other'];
  public sections: Array<{name: string, value: number}> = [
    { name: 'PC', value: 0 },
    { name: 'PMHx', value: 0 },
    { name: 'DH', value: 0 },
    { name: 'FH', value: 0 },
    { name: 'SH', value: 0 },
    { name: 'ROS', value: 0 },
    { name: 'ICE', value: 0 },
    { name: 'Other', value: 0 }
  ];
  private sectionsSub = new BehaviorSubject(this.sections);

  token: string;
  connectionInfo: ConnectionInfo;
  postUrl: string;

  constructor(private http: HttpClient, private wsService: WebsocketService) {
    // this.wsService = wsService
    // this.startConversation();
  }

  loadMessages() {
    return this.messages;
  }

  getConnectionInfo() {
    return this.http.post<ConnectionInfo>('https://directline.botframework.com/v3/directline/conversations', this.token, httpOptions);
  }

  connectToBot(connectionInfo: ConnectionInfo) {
    console.log(connectionInfo);
    this.postUrl = 'https://directline.botframework.com/v3/directline/conversations/' + connectionInfo.conversationId + '/activities';

    this.messages = <Subject<Response>>this.wsService
      .connect(connectionInfo.streamUrl)
      .map((response: MessageEvent): Response => {
        try {
          const data = JSON.parse(response.data);
          return data.activities[0];
        } catch (e) {
          console.log('Error: ', e);
          return;
        }
      });
  }

  sendMessage(message: string): Observable<any> {
    const dict: {} = {
      type: 'message',
      from: {
        id: 'user1'
      },
      text: message
    };
    console.log('Sent: ' + message);
    console.log('POST URL:' + this.postUrl);
    return this.http.post<Message>(this.postUrl, dict, httpOptions);
  }

  getSections() {
    return this.sectionsSub.asObservable();
  }

  updateSections(section) {
    const index = this.sectionsArray.indexOf(section);
    if (index !== -1) {
      this.sections[index].value += 1;
      this.sectionsSub.next(this.sections);
    } else {
      console.log('No type found or does not match array');
    }
  }
}
