import { Injectable } from "@angular/core";
import { EnumObject } from "./models/enum-object";

@Injectable()
export class AppServiceMock {
  constructor() {}

  public getSavedEnums(): EnumObject[] {
    return [];
  }

  public saveNewEnum(newEnum: EnumObject): void {

  }

  public deleteSavedEnum(key: string): void {

  }
}