import { Injectable } from '@angular/core';
import { EnumObject } from '../models/enum-object';

export const SAVED_ENUMS: string = 'savedEnums';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor() { }

  public getSavedEnums(): EnumObject[] {
    let enums: EnumObject[] = this.parseSavedEnums();

    let newEnumObject: EnumObject = {
      key: 'New Enum',
      value: ''
    }

    enums.push(newEnumObject);

    return enums;
  }

  public updateEnum(modifiedEnum: EnumObject): void {
    let enums: EnumObject[] = this.parseSavedEnums();

    let existedEnum = enums.find((item: EnumObject) => item.key == modifiedEnum.key);

    if (existedEnum) {
      existedEnum.value = modifiedEnum.value;
    }

    enums = enums.filter(item => item.key != '');

    localStorage.setItem(SAVED_ENUMS, JSON.stringify(enums));
  }

  public saveNewEnum(newEnum: EnumObject): boolean {
    let enums: EnumObject[] = this.parseSavedEnums();

    if (enums.find((item: EnumObject) => item.key == newEnum.key)) {
      return false;
    }

    enums.push(newEnum);

    enums = enums.filter(item => item.key != '');

    localStorage.setItem(SAVED_ENUMS, JSON.stringify(enums));

    return true;
  }

  public deleteSavedEnum(key: string): void {
    let enums: EnumObject[] = this.parseSavedEnums();

    enums = enums.filter(item => item.key != key && item.key != '');

    localStorage.setItem(SAVED_ENUMS, JSON.stringify(enums));
  }

  private parseSavedEnums(): EnumObject[] {
    let enums: EnumObject[] = [];
    let enumsString = localStorage.getItem(SAVED_ENUMS);

    if (enumsString != null) {
      enums = JSON.parse(enumsString);
    }

    return enums;
  }
}
