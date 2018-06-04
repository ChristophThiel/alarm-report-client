import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertedComponent } from './alerted.component';

describe('AlertedComponent', () => {
  let component: AlertedComponent;
  let fixture: ComponentFixture<AlertedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
