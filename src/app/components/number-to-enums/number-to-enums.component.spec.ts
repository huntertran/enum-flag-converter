import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberToEnumsComponent } from './number-to-enums.component';

describe('NumberToEnumsComponent', () => {
    let component: NumberToEnumsComponent;
    let fixture: ComponentFixture<NumberToEnumsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NumberToEnumsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NumberToEnumsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
