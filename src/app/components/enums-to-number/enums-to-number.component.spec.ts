import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumsToNumberComponent } from './enums-to-number.component';

describe('EnumsToNumberComponent', () => {
    let component: EnumsToNumberComponent;
    let fixture: ComponentFixture<EnumsToNumberComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EnumsToNumberComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EnumsToNumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
