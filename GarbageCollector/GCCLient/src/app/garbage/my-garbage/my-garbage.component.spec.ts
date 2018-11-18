import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGarbageComponent } from './my-garbage.component';

describe('MyGarbageComponent', () => {
  let component: MyGarbageComponent;
  let fixture: ComponentFixture<MyGarbageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGarbageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGarbageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
