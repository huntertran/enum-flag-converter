import { fakeAsync, TestBed } from "@angular/core/testing";

import { AppService, SAVED_ENUMS } from "./app.service";
import { EnumObject } from "./models/enum-object";

describe('AppService Test', () => {
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    appService = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(appService).toBeTruthy();
  })

  it(`should save new enum object`, fakeAsync(() => {
    const enumObject: EnumObject = {
      key: "enumKey",
      value: "enumValue"
    };

    appService.saveNewEnum(enumObject);

    const enumsString = localStorage.getItem(SAVED_ENUMS);
    expect(enumsString).not.toBeNull()

    if (enumsString != null) {
      const enums: EnumObject[] = JSON.parse(enumsString);

      const enumFromStorage = enums.find(e => e.key == enumObject.key);

      if (enumFromStorage != null) {
        expect(enumFromStorage.key).toBe(enumObject.key);
        expect(enumFromStorage.value).toBe(enumObject.value);
      }
      else {
        fail("Enums is not found in local storage!!!");
      }
    }
    else {
      fail("Enums should be saved!!!");
    }
  }));
});