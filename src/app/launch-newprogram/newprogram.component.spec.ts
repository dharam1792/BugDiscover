import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroDiscoverComponent } from './zero-discover.component';

describe('ZeroDiscoverComponent', () => {
  let component: ZeroDiscoverComponent;
  let fixture: ComponentFixture<ZeroDiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZeroDiscoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
