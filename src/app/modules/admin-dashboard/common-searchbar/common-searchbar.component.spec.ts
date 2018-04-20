import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSearchbarComponent } from './common-searchbar.component';

describe('CommonSearchbarComponent', () => {
  let component: CommonSearchbarComponent;
  let fixture: ComponentFixture<CommonSearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
