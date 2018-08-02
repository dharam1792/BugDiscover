import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDetailsResearchComponent } from './program-details-research.component';

describe('ProgramDetailsResearchComponent', () => {
  let component: ProgramDetailsResearchComponent;
  let fixture: ComponentFixture<ProgramDetailsResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDetailsResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDetailsResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
