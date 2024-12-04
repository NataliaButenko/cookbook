import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { usersList } from '../mockData/usersList';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | null>(null);
	public isAuth$ = new BehaviorSubject<boolean>(false);
  private usersList = usersList;
  public users$ = new BehaviorSubject<IUser[]>(this.usersList);
  private key = 'user';

  constructor() { 
    let user = localStorage.getItem(this.key);
    if(user) {
      let parseUser = JSON.parse(user);
      this.currentUser$.next(parseUser);
      this.isAuth$.next(true);
    }
  }

  public login(value: {nickname: string, password: string}): Observable<IUser> {
    return new Observable((observer) => {
      let findUser = usersList.find((item) => item.nickName === value.nickname);
      if(findUser) {
        let valueUser = JSON.stringify(findUser);
        localStorage.setItem(this.key, valueUser);
        this.isAuth$.next(true);
        this.currentUser$.next(findUser);
        observer.next(findUser);
      } else {
        observer.error(new Error('Login error!'));
      }
      observer.complete();
    })
  }

  public logout() {
    localStorage.removeItem(this.key);
    this.isAuth$.next(false);
    this.currentUser$.next(null);
  }

  public refistration(newUser: IUser): Observable<IUser> {
    return new Observable((observer) => {
      let isAlreadyNicknameUsed = usersList.some((item) => item.nickName === newUser.nickName);
      if(isAlreadyNicknameUsed) {
        observer.error(new Error('This nickname is already used, please specify another one'));
      } else {
        this.isAuth$.next(true);
        this.currentUser$.next(newUser);
        observer.next(newUser);
        this.usersList = [...this.usersList, newUser];
        this.users$.next( this.usersList);
      }
      observer.complete();
    })
  }
}
