import { TestBed } from "@angular/core/testing";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AppService, SAVED_ENUMS } from "./app.service";
import { EnumObject } from "./models/enum-object";
import {Overlay} from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('AppService Test', () => {
  let appService: AppService;

  const RunTestCase1: () => void = function () {
    it('should be created', () => {
      expect(appService).toBeTruthy();
    });
  }

  const RunTestCase2: () => void = function () {
    it(`should save new enum object`, () => {
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
    });
  }

  const RunTestCase3: () => void = function () {
    it('should get inserted enums', () => {
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
    });
  }

  const RunTestCase4: () => void = function () {
    it('enum with empty name should not be saved', () => {
      const emptyEnumObject: EnumObject = {
        key: '',
        value: ''
      };
      appService.saveNewEnum(emptyEnumObject);

      const enums: EnumObject[] = appService.getSavedEnums();
      const targetEnum: EnumObject | undefined = enums.find(e => e.key == emptyEnumObject.key);
      expect(targetEnum).toBeUndefined();
    });
  }

  const RunTestCase5: () => void = function () {
    it('should delete enum', () => {
      const enumKey: string = 'enumKey';
      const enumKey2: string = 'enumKey2';

      appService.deleteSavedEnum(enumKey);

      const enums: EnumObject[] = appService.getSavedEnums();
      const deletedEnum: EnumObject | undefined = enums.find(e => e.key == enumKey);
      expect(deletedEnum).toBeUndefined();

      const targetEnum: EnumObject | undefined = enums.find(e => e.key == enumKey2);
      expect(targetEnum).not.toBeUndefined();
    });
  }

  const RunTestCase6: () => void = function () {
    it('Enum with same name should not be saved!', () => {
      const enumObject: EnumObject = {
        key: "enumKey",
        value: "enumValue"
      };

      appService.saveNewEnum(enumObject);
      appService.saveNewEnum(enumObject);

      const enums: EnumObject[] = appService.getSavedEnums();
      const targetEnums: EnumObject[] = enums.filter(e => e.key == enumObject.key);

      expect(targetEnums.length).toBe(1);
    })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatSnackBar, useClass: MatSnackBar },
        { provide: Overlay, useClass: Overlay }
      ]
    });
    appService = TestBed.inject(AppService);
  });

  RunTestCase1();
  RunTestCase2();
  RunTestCase3();
  RunTestCase4();
  RunTestCase5();
  RunTestCase6();
});


