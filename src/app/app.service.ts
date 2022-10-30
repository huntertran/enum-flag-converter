import { Injectable } from '@angular/core';
import { SavedEnum } from './models/saved-enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public getSavedEnums(): SavedEnum[] {
    let enums = localStorage.getItem('savedEnums');

    if (enums != null) {
      return JSON.parse(enums);
    }

    return [];
  }
}
