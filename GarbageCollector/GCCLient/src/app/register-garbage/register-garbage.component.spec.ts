import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGarbageComponent } from './register-garbage.component';

describe('RegisterGarbageComponent', () => {
  let component: RegisterGarbageComponent;
  let fixture: ComponentFixture<RegisterGarbageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGarbageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGarbageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
