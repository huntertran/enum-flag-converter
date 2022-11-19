import { TestBed } from '@angular/core/testing';

import { EnumsService } from './enums.service';
import {EnumObject} from "../models/enum-object";

describe('EnumsService', () => {
  let service: EnumsService;

  const RunTestCase1: () => void = function () {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  }

  const RunTestCase2: () => void = function () {
    it('', () => {
      const enumObject: EnumObject = {
        key: "enumKey",
        value: "="
      }

      expect(() => {
        service.parseFromEnumObject((enumObject))
      }).toThrow(new Error("Empty enum Key!"));
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumsService);
  });

  RunTestCase1();
  RunTestCase2();
});
