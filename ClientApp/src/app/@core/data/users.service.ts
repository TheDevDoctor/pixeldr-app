
import { Injectable } from '@angular/core';

import { NbAuthService } from '@nebular/auth';
import { NbAuthAzureToken } from '../core.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { UserData } from '../classes/users';

@Injectable()
export class UserService {

  userToken: BehaviorSubject<any> = new BehaviorSubject(null);
  userData: UserData;
  userDataSub: BehaviorSubject<UserData> = new BehaviorSubject(this.userData);
  user: any;

  updatingData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private publishUser(user: any) {
    this.userToken.next(user);
  }

  onUserChange(): Observable<any> {
    return this.userToken;
  }

  getUser() {
    this.databaseService.getUserData(this.user.signinname).subscribe(data => {
      this.userData = data;
      this.userDataSub.next(data);
    });
  }

  updateUserData() {
    console.log('Sending UserData to database');
    this.updatingData.next(true);
    this.databaseService.updateUserData(this.userData).subscribe(res => {
      console.log(res);
      if (res.status === 200) {
        this.updatingData.next(false);
      }
    });
  }

  returnUserData(): Observable<UserData> {
    return this.userDataSub.asObservable();
  }

  isUserUpdating() {
    return this.updatingData.asObservable();
  }

  constructor(private authService: NbAuthService, private databaseService: DatabaseService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthAzureToken) => {
        if (token.isValid()) {
          this.publishUser (token.getAccessTokenPayload()); // receive payload from token and assign it to our `user` variable
        }
      }
    );
    this.onUserChange()
      .subscribe((user: any) => {
        this.user = user;
        this.getUser();
      });
  }
}
