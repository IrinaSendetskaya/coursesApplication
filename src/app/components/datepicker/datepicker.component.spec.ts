import { DatepickerComponent } from "./datepicker.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe("DatepickerComponent", () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [DatepickerComponent],
        schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(DatepickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it("should create", () => {
      expect(component).toBeTruthy();
    });
  });