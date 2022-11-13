import { fakeAsync, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { APP_BASE_HREF } from "@angular/common";
import { AppService } from "./app.service";
import { AppServiceMock } from "./app.service.mock";

describe('AppComponent', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AppService, useClass: AppServiceMock},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  it(`App title should be 'enum-flag-converter'`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('enum-flag-converter');
  }));
})