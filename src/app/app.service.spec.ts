import {fakeAsync, TestBed} from "@angular/core/testing";

import {AppService, SAVED_ENUMS} from "./app.service";
import {EnumObject} from "./models/enum-object";

describe('AppService Test', () => {
let appService: AppService;

  const RunTestCase1: () => void = function () {
    it('should be created', () => {
      expect(appService).toBeTruthy();
    });
  }

  const RunTestCase2: () => void = function () {
    it(`should save new enum object`, fakeAsync(() => {
      const enumObject: EnumObject = {
        key: "enumKey",
        value: "enumValue"
      };

      appService.saveNewEnum(enumObject);

      const enumsString = localStorage.getItem(SAVED_ENUMS);
      expect(enumsString).not.toBeNull()

      const enums: EnumObject[] = JSON.parse(enumsString!);
      const enumFromStorage: EnumObject | undefined = enums.find(e => e.key == enumObject.key);
      expect(enumFromStorage).not.toBeNull();
      expect(enumFromStorage!.key).toBe(enumObject.key);
      expect(enumFromStorage!.value).toBe(enumObject.value);
    }));
  }

  const RunTestCase3: () => void = function () {
    it('should get inserted enums', fakeAsync(() => {
      const enumObject: EnumObject = {
        key: "enumKey2",
        value: "enumValue2"
      };

      appService.saveNewEnum(enumObject);

      const enums: EnumObject[] = appService.getSavedEnums();
      expect(enums.length).toBeGreaterThan(0);
      const targetEnum: EnumObject | undefined = enums.find(e => e.key == enumObject.key);

      expect(targetEnum).not.toBeUndefined();
      expect(targetEnum!.key).toBe(enumObject.key);
      expect(targetEnum!.value).toBe(enumObject.value);
    }));
  }

  const RunTestCase4: () => void = function () {
    it('enum with empty name should not be saved', fakeAsync(() => {
      const emptyEnumObject: EnumObject = {
        key: '',
        value: ''
      };
      appService.saveNewEnum(emptyEnumObject);

      const enums: EnumObject[] = appService.getSavedEnums();
      const targetEnum: EnumObject | undefined = enums.find(e => e.key == emptyEnumObject.key);
      expect(targetEnum).toBeUndefined();
    }));
  }

  const RunTestCase5: () => void = function () {
    it('should delete enum', fakeAsync(() => {
      const enumKey: string = 'enumKey';
      const enumKey2: string = 'enumKey2';

      appService.deleteSavedEnum(enumKey);

      const enums: EnumObject[] = appService.getSavedEnums();
      const deletedEnum: EnumObject | undefined = enums.find(e => e.key == enumKey);
      expect(deletedEnum).toBeUndefined();

      const targetEnum: EnumObject | undefined = enums.find(e => e.key == enumKey2);
      expect(targetEnum).not.toBeUndefined();
    }));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    appService = TestBed.inject(AppService);
  });

  RunTestCase1();
  RunTestCase2();
  RunTestCase3();
  RunTestCase4();
  RunTestCase5();
});


