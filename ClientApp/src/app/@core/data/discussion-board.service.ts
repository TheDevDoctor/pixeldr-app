import { Injectable } from '@angular/core';
// import * as data from '../testing_files/discusionBoard.json';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';
import { DiscussionBoard } from '../classes/miscellaneous';
import { UserData } from '../classes/users';
import { UserService } from './users.service';
import { timestamp } from 'rxjs/operators';

// const discussionBoards = (<any>data).default;


@Injectable({
  providedIn: 'root'
})
export class DiscussionBoardService {
  private discussions: Array<{}>;
  private discussionsSub: BehaviorSubject<any> = new BehaviorSubject(this.discussions);

  public sendNewDiscussionSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public sendCommentSub: BehaviorSubject<boolean> = new BehaviorSubject(false);

  user: any;
  userData: UserData;

  constructor(private _databaseService: DatabaseService, private _userService: UserService) {
    this.requestAllDiscussions();

    this._userService.onUserChange()
      .subscribe((user: any) => this.user = user);

    this._userService.returnUserData()
      .subscribe(userData => {
        if (userData) {
          this.userData = userData;
        }
      });
  }

  requestAllDiscussions() {
    this._databaseService.queryDiscussionBoards('SELECT * FROM Discussions d').subscribe(discussions => {
      this.discussions = discussions;
      this.discussionsSub.next(discussions);
      console.log(discussions);
    });
  }

  sendNewDiscussion(postDetails: { title: string, description: string, tags: Array<string> }) {
    // tell subscribed component it is posting.
    this.sendNewDiscussionSub.next(true);

    // form document unique id:
    const idString = this.user.signinname + '_' + (this.userData.discussions.length + 1);

    // add discussion to user data.
    this.userData.discussions.push({id: idString, title: postDetails.title, post: postDetails.description});

    // form new discussion board document:
    const post: DiscussionBoard = {
      id: idString,
      username: this.user.signinname,
      topic: 'Issues & Bugs',
      title: postDetails.title,
      post: postDetails.description,
      dateTimePosted: new Date().getTime(),
      comments: [],
    };

    this._userService.updateUserData();

    // send document and reload discussion boards:
    this._databaseService.sendNewDiscussionBoard(post).subscribe(response => {
      console.log(response);
      if (response.status === 200) {
        this.sendNewDiscussionSub.next(false);
      }
      // const responseD = response;
      this.requestAllDiscussions();
    });
  }

  sendComment(commentDict) {
    this.sendCommentSub.next(true);

    const comment = {
      username: this.user.signinname,
      timestamp: new Date().getTime(),
      comment: commentDict.commentText,
      replies: [],
      quote: commentDict.quote,
    };
    // first get discussion so no data written by someone else is overwritten, and append the comment to the array:
    this._databaseService.getDiscussionBoard(commentDict.discussionName).subscribe(res => {
      const discussion = res.body;
      console.log(discussion);
      discussion.comments.push(comment);
      this.updateDiscussionBoard(discussion, commentDict.discussionIndex);
    });
  }

  updateDiscussionBoard(discussion, index) {
    console.log(discussion);
    this._databaseService.updateDiscussionBoard(discussion).subscribe(res => {
      if (res.status === 200) {
        this.sendCommentSub.next(false);
        this.discussions[index] = discussion;
        this.discussionsSub.next(this.discussions);
      }
    });
  }


  returnDiscussions() {
    return this.discussionsSub.asObservable();
  }

  isDiscussionPosting() {
    return this.sendNewDiscussionSub.asObservable();
  }

  isCommentPosting() {
    return this.sendCommentSub.asObservable();
  }

  getUserData() {}




}
