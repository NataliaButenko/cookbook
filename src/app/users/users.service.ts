import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { usersList } from '../mockData/usersList';
import { IUserBase } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public getAllUsers(): Observable<IUserBase[]> {
    return of(usersList).pipe(
      map((users) => {
        let baseUsers: IUserBase[] = users.map((item) => {
          return {
            ...item,
            created: new Date(),
            recipesCount: Math.floor(Math.random() * (100 - 0 + 1)) + 0
          }
        })
        return baseUsers
      }),
      delay(500)
    );
  }
}
