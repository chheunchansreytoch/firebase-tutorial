import { Injectable } from '@angular/core';
import { IUser } from '../interface/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectDataMappingService {

  constructor() { }

  mapUserData(userData: any) {
    if(!userData) return null;
    return {
      key: userData.key,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
    }
  }
}
