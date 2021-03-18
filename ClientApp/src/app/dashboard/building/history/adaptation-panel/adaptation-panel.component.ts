import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-adaptation-panel',
  templateUrl: './adaptation-panel.component.html',
  styleUrls: ['./adaptation-panel.component.scss']
})
export class AdaptationPanelComponent implements OnInit {
  @Input() adaptationsArr: Array<any>;
  @Input() correctQsArr: Array<any>;
  @Input() adaptations: {};
  @Input() correctQs: {};
  @Input() messages: Array<any>;

  @Output() messageChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  textValue: string;

  constructor() { }

  ngOnInit() { }

  // function to responsively adapt text in data and bot.
  adaptedTextChanged(text, data, i) {
    data.adaptedText = text;
    if (text) {
      this.adaptations[data.qNum] = text;
      if (data.msgNum) {
        this.messages[data.msgNum - 1].text = text;
        this.messageChange.emit(this.messages);
      }
    } else {
      this.adaptations[data.qNum] = '';
      if (data.msgNum) {
        this.messages[data.msgNum - 1].text = data.originalText;
        this.messageChange.emit(this.messages);
      }
    }


    console.log(this.adaptations);
  }

  deleteAdapted(index) {
    delete this.adaptations[this.adaptationsArr[index].qNum];
    this.adaptationsArr.splice(index, 1);
    console.log(this.adaptations);
  }

  deleteCorrect(index) {
    delete this.correctQs[this.correctQsArr[index].qNum];
    this.correctQsArr.splice(index, 1);
    console.log(this.correctQs);
  }

}
