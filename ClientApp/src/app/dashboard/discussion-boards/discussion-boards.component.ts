import { Component, OnInit } from '@angular/core';
import { DiscussionBoardService } from '../../@core/data/discussion-board.service';
import { UserService } from '../../@core/data/users.service';
import { DiscussionBoard } from '../../@core/classes/miscellaneous';


@Component({
  selector: 'ngx-discussion-boards',
  templateUrl: './discussion-boards.component.html',
  styleUrls: ['./discussion-boards.component.scss']
})
export class DiscussionBoardsComponent implements OnInit {
  discussions: Array<DiscussionBoard>;
  selectedDiscussion: DiscussionBoard;
  selectedIndex: number;

  loading: boolean = true;
  posting: boolean = false;
  disPosting: boolean = false;
  userDataPosting: boolean = false;
  sendingPost: boolean = false;
  commenting: boolean = false;
  sendingComment: boolean = false;

  // comment variables
  commentText: string;
  quote: string;

  // new post variables:
  newPostTitle: string;
  newPostDesc: string;
  newPostTags: Array<string>;

  constructor(private _discussionService: DiscussionBoardService, private _userService: UserService) {}

  ngOnInit() {
    this._discussionService.returnDiscussions().subscribe(discussions => {
      if (discussions !== undefined) {
        this.discussions = discussions;
        this.selectedDiscussion = this.discussions[0];
        this.selectedIndex = 0;
        this.loading = false;
      }
    });

    this._discussionService.isDiscussionPosting().subscribe(sending => {
      this.disPosting = sending;
      if (!this.userDataPosting && !sending) {
        this.posting = false;
        this.sendingPost = false;
      }
    });
    this._userService.isUserUpdating().subscribe(sending => {
      this.userDataPosting = sending;
      if (!this.disPosting && !sending) {
        this.posting = false;
        this.sendingPost = false;
      }
    });

    this._discussionService.isCommentPosting().subscribe(sending => {
      this.sendingComment = sending;
      if (!sending && this.commenting) {
        this.commenting = false;
      }
    });
  }

  public discussionSelected(i) {
    console.log('selected discussion ' + i);
    this.selectedIndex = i;
    this.commenting = false;
    this.selectedDiscussion = this.discussions[i];
  }

  public newPostPressed() {
    this.posting = true;
  }

  public closeNewPost() {
    this.posting = false;
  }

  public newCommentPressed(quote?) {
    if (quote) {
      this.quote = quote.comment;
    } else {
      this.quote = undefined;
    }
    this.commenting = !this.commenting;
  }

  public searchTextChanged($event) {
    return;
  }

  public sendNewDiscussion() {
    if (this.newPostTitle && this.newPostDesc) {
      this.sendingPost = true;
      this._discussionService.sendNewDiscussion({ title: this.newPostTitle, description: this.newPostDesc, tags: this.newPostTags });
    }
  }

  public sendNewComment() {
    this._discussionService.sendComment({discussionName: this.selectedDiscussion.id, discussionIndex: this.selectedIndex, commentText: this.commentText, quote: this.quote});
  }
}
